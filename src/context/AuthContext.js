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

    const signUp = async (registerEmail, registerPassword) => {
       return createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    }

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        return signOut(auth)
    }

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