import React, {useState} from 'react';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import SignInOutContainer from '../container/Container';
import { useAuth } from '../context/AuthContext';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const {setLoginModal, currentUser, logout} = useAuth();

  const openLoginModal = () =>{
    setLoginModal(true)
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const logOut = async () => {
    try {
      await logout();
    } catch (error) {
      
    }
  }

  // const openLogin = () => {
  //   setModal({isOpen: true, title:'Login', content: <Login/>})
  // }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', background: 'black'}}>
        {!currentUser ? <Box sx={{display: 'flex'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
        <Link style={{textDecoration: 'none'}} to='/' className='link'><Typography sx={{minWidth: 100, marginRight: 20, color: 'white'}}>Home</Typography></Link>
        <Link style={{textDecoration: 'none'}} to='/Calendar' className='link'><Typography sx={{minWidth: 100, position: 'absolute', top: 0, left: 200, color: 'white'}}>Calendar</Typography></Link>
        <Link style={{textDecoration: 'none'}} to='/EventList' className='link'><Typography sx={{minWidth: 100, position: 'absolute', top: 0, left: 400, color: 'white'}}>Event List</Typography></Link>
        <Button sx={{position: 'absolute', top: 6, right: "2%", height: 34,}} startIcon={<LockIcon/>} onClick={openLoginModal}>Login</Button>
      </Box>
      </Box>: (
      <Box sx={{display: 'flex'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',}}>
        <Link style={{textDecoration: 'none'}} to='/' className='link'><Typography sx={{minWidth: 100, marginRight: 20, color: 'white'}}>Home</Typography></Link>
        <Link style={{textDecoration: 'none'}} to='/Calendar' className='link'><Typography sx={{minWidth: 100, marginRight: 20, color: 'white'}}>Calendar</Typography></Link>
        <Link style={{textDecoration: 'none'}} to='/EventList' className='link'><Typography sx={{minWidth: 100, marginRight: 20, color: 'white'}}>Event List</Typography></Link>
      </Box>
      <Box sx={{marginLeft: 55}}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 34, height: 34 }} src={currentUser?.avatar}>
                {currentUser?.displayName?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      </Box>
        )}
        
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link style={{color: 'black', textDecoration: 'none'}} to='/Profile'>
        <MenuItem>
           <Avatar src={currentUser?.avatar}/> Profile 
        </MenuItem>
        </Link>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Link style={{color: 'black', textDecoration: 'none'}} to='/'>
        <MenuItem
        onClick={logOut}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        </Link>
      </Menu>
      <SignInOutContainer/>
    </React.Fragment>
  );
}

