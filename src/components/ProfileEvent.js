import React from 'react';
import {Avatar, Button, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import { Box } from '@mui/material';
import DeleteButton from './DeleteButton';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { Delete } from '@mui/icons-material';



function Event({title, tags, date, startTime, endTime, location, name, description, url}) {    
    const deleteDocument = async () => {
        await deleteDoc(doc(db, "events", title));
    }
  
    const buttonClicked = () => {
        console.log('button clicked')
    }
  
    return (
    <Box sx={{border: 'solid'}}>
    <List className="event__list">
    <Button 
    sx={{
    position: 'absolute', 
    right: 0, 
    zIndex: 3, 
    justifyContent: 'center',
    alignItems: 'center',
    }} onClick={deleteDocument}>
    <DeleteButton 
    sx={{
    marginLeft: "auto",
    marginRight: "auto",
    }}/>
    </Button>
        <ListItem>
            <ListItemAvatar>
                <Avatar/>
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={title}
            />
        </ListItem>
        <ListItem>
            <ListItemText 
              primary={description}
              secondary={tags}
            />
        </ListItem>
        <ListItem>
            <ListItemText 
              primary={location}
              secondary={`${date}: ${startTime} - ${endTime}`}
            />
        </ListItem>
        <ListItem>
        <a href={url} rel="noreferrer">Click here for more details</a>
        </ListItem>
    </List>
    </Box>
  )
}

export default Event