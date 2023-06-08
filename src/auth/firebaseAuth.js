import React, { useEffect, useState } from 'react';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
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
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(
                    `%cUser with id: ${user.uid} created successfully`,
                    'color: green;'
                );
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                // setSignUpError(error);
            });
    }
}

export  function handleLogin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(
                `%cUser with id: ${user.uid} logged in successfully`,
                'color: green;'
            );
            // redirectAfterLogin(user.uid)
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // setLoginError(error);
        });
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
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            console.log(user.email)

            // IdP data available using getAdditionalUserInfo(result)
        })
        .catch((error) => { });
}