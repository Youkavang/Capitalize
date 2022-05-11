import React, {useState} from 'react'
import { onSnapshot, collection, doc, setDoc, addDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { Button, FormControl, TextField, InputLabel, Modal, Paper } from '@mui/material'
import {Close} from'@mui/icons-material'
import {db} from '../firebase/config';
import { useAuth } from '../context/AuthContext';



function EventForm() {
    const {setEventModal, uid} = useAuth();
    const [events, setEvents] = useState('');
    const [name, setName] = useState("");
    const [titleInput, setTitleInput] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [start24Hr, setStart24Hr] = useState("")
    const [end24Hr, setEnd24hr] = useState("")
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState([]);
    const [descriptionInput, setDescriptionInput] = useState ("");
    const [url, setUrl] = useState("");
    const milwaukeeZipcodes = ['53022', '53154', '53202', '53203', '53204', '53205', '53206', '53207',
    '53208', '53209', '53210', '53211', '53212', '53213', ,'53214', '53215', '53216', '53217', '53218',
    '53219', '53220', '53221', '53222', '53223', '53224', '53225', '53226', '53227', '53228', '53233', '53235'];
    let start; 
    let end;
    let isInMilwaukee;

    const paperStyle={width: 700, margin: '20px auto'}

    const closeEventModal = () => {
      setEventModal(false);
    }

    const handleName = (e) => {
        setName(e.target.value)
      }
    
      const handleTitle = (e) =>{
        setTitleInput(e.target.value)
      }
    
      const handleStartDate = (e) =>{
        setStartDate(e.target.value);
      }
    
      const handleEndDate = (e) =>{
        setEndDate(e.target.value);
      }
      
      const handleStartTime = (e) =>{
        start = (e.target.value);
        setStartTime(start);
        setStart24Hr((convertTime12to24(startTime)));
      }
     
      const handleEndTime = (e) =>{
        end = (e.target.value);
        setEndTime(end);
        setEnd24hr((convertTime12to24(endTime)));
      }
    
      const handleLocation = (e) => {
        setLocation(e.target.value);
      }
    
      const handleUrl = (e) => {
        setUrl(e.target.value);
      }
    
      const handleTags =(e) =>{
        setTags(e.target.value);
      }
    
      const handleDescription = (e) =>{
        setDescriptionInput(e.target.value);
      } 

      // Function to convert from 12hr to 24hr as FullCalendar uses 24hr time
  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'P' || modifier === 'p') {
      hours = parseInt(hours, 10) + 12;
      return `${hours}:${minutes}`;
    } else {
      if(hours < 10){
        return `0${hours}:${minutes}`
      } else{
        return `${hours}:${minutes}`
      };
    }
    
  }

const addEvent = (e) =>{
  e.preventDefault();  
  milwaukeeZipcodes.forEach(zipcode =>{
    if(location.includes(zipcode)){
      isInMilwaukee = true;
      return isInMilwaukee;
    };
  })
  //Adds a document to databse and specifies the id of said document
  //Either the title or tag must include tech in order to be submitted
  if((name.toLowerCase().includes('tech') 
  || titleInput.toLowerCase().includes('tech') 
  || tags.toLowerCase().includes('tech')
  || descriptionInput.toLowerCase().includes('tech'))
  && isInMilwaukee){
  const newEvent = doc(db, 'events', `${titleInput}`);
  setDoc(newEvent, 
      {
        name: name,
        title: titleInput,
        tags: tags,
        date: startDate,
        start: `${startDate}T${start24Hr}`,
        end: `${endDate}T${end24Hr}`,
        startingTime: startTime,
        endingTime: endTime,
        location: location,
        description: descriptionInput,
        website: url,  
        userId: uid,
       
      })

      setEvents([...events, 
    {
      name: name,
      title: titleInput, 
      tags: tags,
      date: startDate, 
      description: descriptionInput,
      startTime: startTime,
      endTime: endTime,
      location: location,
      url: url
    }]);
  console.log(startTime);
  console.log(endTime);
  setName('');
  setTitleInput('');
  setTags('');
  setStartDate('');
  setEndDate('');
  setStartTime('');
  setEndTime('');
  setLocation('');
  setDescriptionInput('');
  setUrl('');
  setEventModal(false);
} else if(!isInMilwaukee) {
  alert("The event you are trying to add is not a in the Milwaukee area!")
} else {
  alert('This is not a tech event!')
}
}

  return (
      <form>
        <Paper 
        style={paperStyle}
        sx={{position: 'absolute', top: -15, right: 325}}>
        <Button
        onClick={closeEventModal}
        >
            <Close/>
        </Button>
        <FormControl>
          <TextField 
          required='true' 
          label="Event Organizer" 
          onChange={handleName} 
          value={name} 
          variant="outlined"
          style={{width: 700}}
          autoComplete='off'
          ></TextField>
          <FormControl> 
            <TextField 
            required='true' 
            label ="Event Title" 
            onChange={handleTitle} 
            value={titleInput}
            autoComplete='off'
            ></TextField>
          </FormControl>
          <FormControl>
            <TextField 
            required='true' 
            label="Event Tags" 
            onChange={handleTags} 
            value={tags}
            autoComplete='off'
            ></TextField>
          </FormControl>
          <FormControl>
            <TextField 
            required='true' 
            label="(start date) yyyy-mm-dd format"
            onChange={handleStartDate} 
            value={startDate}
            autoComplete='off'
            ></TextField>
          </FormControl>
          <FormControl>
            <TextField 
            label ='(end date) yyyy-mm-dd format'
            onChange={handleEndDate} 
            value={endDate}
            autoComplete='off'
            ></TextField>
          </FormControl>
          <FormControl>
            <TextField 
            required='true' 
            label='Start Time' 
            onChange={handleStartTime} 
            value={startTime}
            autoComplete='off'
            ></TextField>
          </FormControl>
          <FormControl>
            <TextField 
            required='true' 
            label='End Time' 
            onChange={handleEndTime} 
            value={endTime}
            autoComplete='off'
            ></TextField>
          </FormControl>
          <FormControl>
            <TextField
             required='true' 
             label='Event Location' 
             onChange={handleLocation} 
             value={location}
             autoComplete='off'></TextField>
          </FormControl>
          <FormControl>
            <TextField 
            required='true' 
            label='Event Description' 
            onChange={handleDescription} 
            value={descriptionInput}
            autoComplete='off'></TextField>
          </FormControl>
          <FormControl>
            <TextField 
            label='Event Url' 
            onChange={handleUrl} 
            value={url}
            autoComplete='off'></TextField>
          </FormControl>          
          <Button 
          variant="contained" 
          type="submit" 
          onClick={addEvent}
          autoComplete='off'>Add Event</Button>
        </FormControl>  
        </Paper>
      </form>
  )
}

export default EventForm