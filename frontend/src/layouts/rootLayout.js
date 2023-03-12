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
    const users = { email: 'user@example.com', profilePic: '/path/to/profilePic.jpg' }; // Replace with actual user data

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
                <>
                <MenuItem onClick={handleClose}>
                    <NavLink to={'/signup'}>Signup</NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NavLink to={'/login'}>Login</NavLink>
                </MenuItem>
                </>
            )}
            {user && (
                <>
                <MenuItem onClick={handleClose}>
                    <span>{user.email}</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button onClick={handleLogout} variant="outlined" color="secondary">
                    Logout
                    </Button>
                </MenuItem>
                </>
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


//foolish considerations
// import { useState } from 'react';
// import { Link as RouterLink, Outlet } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Button,
//   Link,
//   Box,
//   Grid,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const NavBar = ({ user, handleLogout }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleMobileMenuOpen = () => {
//     setMobileMenuOpen(true);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMenuOpen(false);
//   };

//   const desktopNav = (
//     <Grid container spacing={2} alignItems="center">
//       <Grid item>
//         <Link component={RouterLink} to="/" underline="none">
//           <Typography variant="h6" color="inherit" noWrap>
//             Home
//           </Typography>
//         </Link>
//       </Grid>
//       {user ? (
//         <>
//           <Grid item>
//             <Typography variant="body1" color="inherit" noWrap>
//               {user.email}
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           </Grid>
//         </>
//       ) : (
//         <>
//           <Grid item>
//             <Link component={RouterLink} to="/signup" underline="none">
//               <Button color="inherit">Sign Up</Button>
//             </Link>
//           </Grid>
//           <Grid item>
//             <Link component={RouterLink} to="/login" underline="none">
//               <Button color="inherit">Log In</Button>
//             </Link>
//           </Grid>
//         </>
//       )}
//     </Grid>
//   );

//   const mobileNav = (
//     <>
//       <IconButton
//         edge="start"
//         color="inherit"
//         aria-label="menu"
//         onClick={handleMobileMenuOpen}
//       >
//         <MenuIcon />
//       </IconButton>
//       <Typography variant="h6" color="inherit" noWrap>
//         My App
//       </Typography>
//     </>
//   );

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Grid item>
//             {isMobile ? mobileNav : desktopNav}
//           </Grid>
//           <Grid item>
//             {user && (
//               <Link component={RouterLink} to="/">
//                 <img
//                   src="/path/to/profile/picture"
//                   alt="Profile"
//                   style={{ width: '50px', borderRadius: '50%' }}
//                 />
//               </Link>
//             )}
//           </Grid>
//         </Grid>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;
