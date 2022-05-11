import React, { useState, useContext, createContext, useEffect } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";


const authContext = createContext();

export const useAuth = () =>{
    return useContext(authContext)
}

const AuthContext = ({children}) => {
    const [uid, setUid] = useState('');
    const [profileEvents, setProfileEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [loginModal, setLoginModal] = useState(false);
    const [eventModal, setEventModal] = useState(false);

    // registers the email and password typed in to the firestore database
    const signUp = async (registerEmail, registerPassword) => {
       return createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    }

    //checks to see if email and password matches so user can login
    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logs out the current user
    const logout = async () => {
        setProfileEvents()
        return signOut(auth)
    }

    //keeps track and detects a change in the current user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            setUid(user.uid)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        setCurrentUser,
        signUp,
        logout,
        login,
        loginModal,
        setLoginModal,
        profileEvents,
        setProfileEvents,
        eventModal,
        setEventModal,
        events,
        setEvents,
        uid,
  }
  
  
    return (
    <authContext.Provider value={value}>{children}</authContext.Provider>
  )
}

export default AuthContext