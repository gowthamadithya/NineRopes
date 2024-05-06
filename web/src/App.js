import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import InvalidURL from './Components/InvalidURL';

// import { Provider, useSelector, useDispatch } from 'react-redux'
// import {ADDPOST} from "./store/actions/postData.actions"
// import store from './store';


//import PostKlip from './Components/CreateAKlip';
import { CreateAKlip, Feed, KlipDetails, Login, NavBar, Profile, SearchDetails } from './Components';
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import appTheme from './utils/constants';


const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box sx={{ 'backgroundColor': '#161b22' }}>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/klip/:id" element={<KlipDetails />} />
          <Route path="/search/:searchText" exact element={<SearchDetails />} />
        </Routes>
      </Box>
    </ThemeProvider>
  </BrowserRouter>
)

export default App;