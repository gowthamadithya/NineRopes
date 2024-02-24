import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import InvalidURL from './Components/InvalidURL';
import NavBar from './Components/NavBar';
import Profile from './Components/Profile';

// import { Provider, useSelector, useDispatch } from 'react-redux'
// import {ADDPOST} from "./store/actions/postData.actions"
// import store from './store';


import PostKlip from './Components/CreateAKlip';
import { Klips } from './Components/Klips';


export default function App() {




  return (



      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Login />} />
          <Route path="/klips" element = {<Klips />} />
          <Route path="/create" element = {<PostKlip />} />
          <Route path="/profile" element = {<Profile />} />
          <Route path="*" element={<InvalidURL />} />
        </Route>
      </Routes>


  );
}