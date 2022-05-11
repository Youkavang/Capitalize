import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, doc, setDoc, addDoc, query, where, orderBy } from 'firebase/firestore';
import { Modal, } from '@mui/material'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import EventList from './EventList';
import './Calendar.css';
import { db } from '../firebase/config';
import EventForm from '../components/EventForm';
// import EventForm2 from '../components/EventForm2';
import { useAuth } from '../context/AuthContext';

function Calendar() {
  const {eventModal, setEventModal, currentUser, events, setEvents} = useAuth();
  // const [events, setEvents] = useState([]);
  
    useEffect(
      () =>{
          onSnapshot(collection(db, "events"), (snapshot) =>
          setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
        console.log(events)
      },
        [events]
    );

  return (
    <div className="App">
      {(!currentUser) ? (<div className='calendar'>
        <FullCalendar
          plugins={[ dayGridPlugin, ]}
          headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        events={events}
        // eventClick={handleEventClick}
        fixedWeekCount={false}
        />
      </div>) : (<div className='calendar'>
        <FullCalendar
        customButtons={{
            addEventButton: {
                text: 'Add Event',
                click: function() {
                    setEventModal(true);
                }
            },
        }}
          plugins={[ dayGridPlugin, ]}
          headerToolbar={{
          left: 'prev,next today addEventButton',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        events={events}
        // eventClick={handleEventClick}
        fixedWeekCount={false}
        
        />
      </div>)}
    <Modal
      open={eventModal}
    >
      <EventForm />
    </Modal>
     
      {/* <Modal
        open={infoModal}
        appElement={document.getElementById('root')}
        className="infoModal"
        overlayClassName='infoOverlay'
      >
        <div className="label-t-d">
          <label>{`Event Title: ${eventTitle}`}</label>
        </div>
        <div className="label-t-d">
          <label>{`Event Tags: ${eventTags}`}</label>
        </div>
        <div className="label-t-d"> 
          <label>{`Event Description: ${eventDesc ? eventDesc : "this event has no summary"}`}</label>
        </div>
        <div className="event-close-btn" >
        <button onClick={handelInfoCancel}>
          Close
        </button>
        </div>
      </Modal> */}
    </div>
  );
}


export default Calendar;
 