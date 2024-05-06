import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// const appTheme = createTheme({

//   typography: {
//     fontSize: 11,
//     fontFamily: 'Droid Sans',
//   },
//   spacing: 8,
//   shape: {
//     borderRadius: 10,
//   },
// })


const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#009ffd',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#161b22',
      dark: '#000',
      paper: '#161b22',
    },
    text: {
      primary: '#e7e9ea',
      dark: '#000'
    },
    error: {
      main: '#F8C8DC',
    },
    warning: {
      main: '#ffa400',
    },
    info: {
      main: '#056896',
    },
    success: {
      main: '#07a20e',
    },
    divider: '#3e4144',
  }, 
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    // Your typography settings
  },
  spacing: 8,
  shape: {
    // Your shape settings
  },
});


export default appTheme;






export const sideBarOptions = [
  { name: 'Home', icon: <HomeIcon />, },
  { name: 'Popular', icon: <WhatshotIcon />, },
  { name: 'favorites', icon: <FavoriteIcon /> },
  { name: 'Settings', icon: <SettingsIcon />, },
  { name: 'Profile', icon: <AccountCircleIcon />, },
];