import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from "expo-router";
import { getCurrentSession } from '../lib/appwrite';

const AppLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const session = await getCurrentSession();
            if (session) {
                router.replace("/home");
            } else {
                router.replace("/sign_in");
            }
        } catch (error) {
            console.error('Session check failed:', error);
            router.replace("/sign_in");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return null;
};

export default AppLoader;