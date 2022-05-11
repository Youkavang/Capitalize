import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase/config';
import { onSnapshot, collection, doc, setDoc, addDoc, query, where, orderBy } from 'firebase/firestore';



function EventList() {
  const {events, setEvents} = useAuth();
  const [isNameToggled, setIsNameToggled] = useState(false);
  const [isTagsToggled, setIsTagsToggled] = useState(false);
  const [isStartToggled, setIsStartToggled] = useState(false);


  useEffect(
      () =>{
      //Will organize by name of who made the event in ascending order when a button is toggled
      if(isNameToggled){
      const eventRef = collection(db, "events");
      const q = query(eventRef, orderBy("name", "asc"))
      onSnapshot(q, (querySnapshot) =>
      setEvents(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    } 
      //Will organize by topic names in ascending order when a button is toggled. 
      else if(isTagsToggled){
      const eventRef = collection(db, "events");
      const q = query(eventRef, orderBy("tags", "asc"))
      onSnapshot(q, (querySnapshot) =>
      setEvents(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
  
      //Will organize by start times. 
      }else if(isStartToggled){
        const eventRef = collection(db, "events");
        const q = query(eventRef, orderBy("start", "asc"))
        onSnapshot(q, (querySnapshot) =>
        setEvents(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        
      //Default display of events
      }else{
      onSnapshot(collection(db, "events"), (snapshot) =>
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    }
      }, [isNameToggled, isTagsToggled, isStartToggled])


  const handleNameToggled = () => {
    setIsNameToggled(!isNameToggled)
    if(isTagsToggled === true){
      setIsTagsToggled(false)
    }else if(isStartToggled === true){
      setIsStartToggled(false);
    }
  }

  const handleTagsToggled = () => {
    setIsTagsToggled(!isTagsToggled)
    if(isNameToggled === true){
      setIsNameToggled(false)
    }else if(isStartToggled === true){
      setIsStartToggled(false);
    }
  }

  const handleStartToggled = () =>{
    setIsStartToggled(!isStartToggled)
    if(isNameToggled === true){
      setIsNameToggled(false)
    }else if(isTagsToggled === true){
      setIsTagsToggled(false);
    }
  }

  return (
    <div>
      <div className='event-list'>
        <h1>Event List</h1>
        <br/>
        <Button variant="outlined" onClick={handleNameToggled}>Organizer Name</Button>
        <Button variant="outlined" onClick={handleTagsToggled}>Tag</Button>
        <Button variant="outlined" onClick={handleStartToggled}>Starting Time</Button>
      </div>
        {events.map(event =>(
          <Event 
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

export default EventList