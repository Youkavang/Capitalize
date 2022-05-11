import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Modal, Paper } from '@mui/material';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { useAuth } from '../context/AuthContext';

const SignInOutContainer= () => {
    const [value, setValue] = React.useState(0);
    const {loginModal, setLoginModal} = useAuth();

    const handleClose = () => {
      setLoginModal(false)
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const paperStyle={width: 600, margin: '20px auto'}

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

    return(
    <Modal
    open={loginModal}
    >
    <Paper style={paperStyle}>
      {/* <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs> */}
      <Button onClick={handleClose}
      sx={{position: 'absolute', top:20, right:380}}
      ><CloseRoundedIcon /></Button>
      <TabPanel value={value} index={0}>
        <SignIn handleChange={handleChange}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp handleChange={handleChange}/>
      </TabPanel>
    </Paper>
    </Modal>
    )
}

export default SignInOutContainer