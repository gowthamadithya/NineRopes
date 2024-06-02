import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { blue, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';


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
    fontFamily: 'Jersey 25 Charted',
    fontSize: 14,
    htmlFontSize: 16,
    h6: {
      fontFamily: 'Droid Sans',
      fontSize: '1.2rem',
      letterSpacing: '0.1rem',
    },
    body1: {
      fontFamily: 'Droid Sans',
      fontSize: '1rem',
    },
  },
  spacing: 4,
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(255, 255, 255, 0.3)', // Small shadow
    '0px 4px 8px rgba(255, 255, 255, 0.3)', // Medium shadow
    '0px 8px 16px rgba(255, 255, 255, 0.3)', // Large shadow
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
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