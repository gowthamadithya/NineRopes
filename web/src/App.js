import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import InvalidURL from './Components/InvalidURL';

// import { Provider, useSelector, useDispatch } from 'react-redux'
// import {ADDPOST} from "./store/actions/postData.actions"
// import store from './store';


//import PostKlip from './Components/CreateAKlip';
import { CreateAKlip, Feed, KlipDetails, Login, NavBar, Profile, SearchDetails } from './Components';
import { Box, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import appTheme from './utils/constants';
import SideBar from './Components/sidebar';
import Layout from './Components/layout';
import RopeDetails from './Components/RopeDetails';


const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box sx={{ 'backgroundColor': 'background.default' }}>

        <NavBar />

        <Stack
          sx={{
            backgroundColor: 'background.default',
            flexDirection: { xs: 'column', md: 'row' },
            height: '100vh', // Set the stack height to match viewport height
            width: '100%',
            position: 'fixed'
          }}
        >

          <SideBar />

          <Routes>
          {/* <Route path="/" element={<Layout />} >
              <Route path="feed" element={<Feed />} />
              <Route path="/search/:searchText" exact element={<SearchDetails />} />
            </Route> */}
            <Route path="/" element={<Feed />} />
            <Route path="/rope/:ropeName" element={<RopeDetails />} />
            <Route path="/klip/:id" element={<KlipDetails />} />
            <Route path="/search/:searchText" exact element={<SearchDetails />} />
          </Routes>

        </Stack>


      </Box>
    </ThemeProvider>
  </BrowserRouter>
)

export default App;