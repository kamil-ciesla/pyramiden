import React, {useEffect, useState} from 'react';

import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';

import {app} from "../db/db"

// ##########
// AUTH SETUP
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});
export const AuthContext = React.createContext();

// END AUTH SETUP
// ##############

export function handleRegister(email, password, repeatedPassword) {
    if (password === repeatedPassword) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
}

export async function handleLogin(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);
    if (pending) {
        return <></>;
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export function handleGoogleLogin() {
    return signInWithPopup(auth, googleProvider)
}
