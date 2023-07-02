"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import firebase_app from '@/lib/firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = createContext<User|null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children} : {children:ReactNode}) => {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={ user }>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};