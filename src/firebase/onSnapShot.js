import React, {useEffect, useState} from 'react'
import {collection, onSnapshot, } from 'firebase/firestore'
import { db } from './config';


const OnSnapShot = (collectionName = 'events') => {
  const [events, setEvents] = useState([]);

  useEffect(
    () =>{
        onSnapshot(collection(db, collectionName), (snapshot) =>
        setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
      console.log(events)
    },
      []
  );

  return (
    {events}
  )
}

export default OnSnapShot