import { Platform } from "react-native";

import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

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


export async function signIn(email,password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}



