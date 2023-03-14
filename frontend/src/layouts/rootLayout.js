import { NavLink, Outlet } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react";


export const RootLayout=()=>{
    const {user}=useAuthContext()
    const {logout}=useLogout()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout=()=>{
        logout()
    }
    //const users = { email: 'user@example.com', profilePic: '/path/to/profilePic.jpg' }; // Replace with actual user data

    return(
        
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
            >
            <MenuIcon />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>
                <NavLink to={'/'}>Home</NavLink>
            </MenuItem>
            {!user && (
                <Box>
                <MenuItem onClick={handleClose}>
                    <NavLink to={'/signup'}>Signup</NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NavLink to={'/login'}>Login</NavLink>
                </MenuItem>
                
                </Box>
            )}
            {user && (
                <Box>
                <MenuItem onClick={handleClose}>
                    <span>{user.email}</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <span>{user.id}</span>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                    <Button onClick={handleLogout} variant="outlined" color="secondary">
                    Logout
                    </Button>
                </MenuItem>
                
                </Box>
            )}
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
            </Typography>
            {user && (
            <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 1 }}>
                    <img src={user.profilePic} alt="Profile" height="32" width="32" />
                </Box>
                <Typography variant="subtitle1">{user.email}</Typography>
                </Box>
            </>
            )}
        </Toolbar>
        </AppBar>
        <Box sx={{ mt: 2 }}>
        <Outlet />
        </Box>
    </Box>

        
    )
}


