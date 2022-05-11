import { useAuth } from '../context/AuthContext'
import React, {useEffect} from 'react'
import ProfileEvent from '../components/ProfileEvent';
import { onSnapshot, collection, doc, setDoc, addDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';


const Profile = () => {
  const {profileEvents, setProfileEvents, uid} = useAuth();

  useEffect(
      () =>{
      //Will organize by name of who made the event in ascending order when a button is toggled
      const eventRef = collection(db, "events");
      const q = query(eventRef, where("userId", '==', uid))
      onSnapshot(q, (querySnapshot) =>
      setProfileEvents(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    } ,[profileEvents])

  return (
    <div>
      <div className='event-list'>
        <h1>Event List</h1>
      </div>
        {profileEvents.map(event =>(
          <ProfileEvent 
            name={event.name}
            title={event.title} 
            topic={event.topic}
            tags={event.tags}
            date={event.date} 
            startTime={event.startingTime}
            endTime={event.endingTime}
            location={event.location}
            description={event.description}
            url={event.website}
            key={event.id}  
          />
        ))}
      </div>
  )
}

export default Profile