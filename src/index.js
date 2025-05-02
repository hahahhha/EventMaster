import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Loginpage from './components/Loginpage';
import RegisterUserPage from './components/RegisterUserPage';
import Loginpagenob from './components/WelcomePage';
import Mainpage from './components/Mainpage';
import axios from 'axios';
import { API_URL } from './confing';
import Eventcard from './components/Eventcard';

// import 'bootstrap/dist/css/bootstrap.min.css';
// без бутстрапа

// App.js или index.js

import testPic from './assets/event1.jpg'

axios.defaults.baseURL = API_URL;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Loginpagenob />
  },
  {
    path: "/login",
    element: <Loginpage />
  },
  {
    path: "/register",
    element: <RegisterUserPage />
  },
  {
    path: "/main",
    element: <Mainpage />
  },
  {
    path: "/card",
    element: <Eventcard 
      title="Test title" 
      description="Test description lorem impsum" 
      date="27.04.2006" 
      img={testPic}/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
