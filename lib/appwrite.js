import { Platform } from "react-native";

import { Client, Account, ID,Query, Avatars, Databases } from 'react-native-appwrite';

import {
    APPWRITE_ENDPOINT,
    APPWRITE_PLATFORM,
    APPWRITE_PROJECT_ID,
    APPWRITE_DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID,
    APPWRITE_VIDEO_COLLECTION_ID,
    APPWRITE_STORAGE_ID
} from './secrets'

export const config = {
    endpoint: APPWRITE_ENDPOINT,
    platform: APPWRITE_PLATFORM,
    projectId: APPWRITE_PROJECT_ID,
    databaseId: APPWRITE_DATABASE_ID,
    userCollectionId: APPWRITE_USER_COLLECTION_ID,
    videoCollectionId: APPWRITE_VIDEO_COLLECTION_ID,
    storageId: APPWRITE_STORAGE_ID
}
const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    
    try { 
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);

        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar:avatarUrl
        })
        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
    
}


// export async function signIn(email,password) {
//     try {
//         const session = await account.createEmailPasswordSession(email, password)
//         return session;
//     } catch (error) {
//         console.log(error);
//         throw new Error(error);
//     }
// }
export async function signIn(email, password) {
    try {
        // // Check if there's an existing session
        // const existingSession = await account.getSession('current');
        // if (existingSession) {
        //     // If a session exists, delete it before creating a new one
        //     await account.deleteSession(existingSession.$id);
        // }
        // Create a new session
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function getCurrentSession() {
    try {
        const session = await account.getSession('current');
        return session;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}
export async function checkAuthStatus() {
    try {
        const session = await getCurrentSession();
        if (session) {
            const user = await getCurrentUser();
            return { isLogged: true, user };
        }
        return { isLogged: false, user: null };
    } catch (error) {
        console.log("Check auth status error:", error);
        return { isLogged: false, user: null };
    }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

