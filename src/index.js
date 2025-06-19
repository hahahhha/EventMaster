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
import Mainpage from './components/MainPage';
import Eventpage from './components/EventPage/Eventpage';
import Profilepage from './components/Profilepage';
import Adminpage from './components/AdminPage/Adminpage';
import Statisticpage from './components/StatisticsPage/Statisticspage';

import Comment from './components/EventPage/Comment';

import axios from 'axios';
import { API_URL } from './confing';


// App.js или index.js

import testPic from './assets/event1.jpg'
import Ratingpage from './components/RatingPage/Ratingpage';
import Createevt from './components/Createevt';
import Eventstatpage from './components/EventStatisticsPage/Eventstatpage';
import RegisterRolePage from './components/RegisterRolePage/RegisterRolePage';
import RegisterAdmin from './components/RegisterRolePage/RegisterAdmin';
import RegisterOrganizer from './components/RegisterRolePage/RegisterOrganizer';
import GiveAdmin from './components/GiveRole/GiveAdmin';
import GiveRole from './components/GiveRole/GiveRole';
import GiveOrganizer from './components/GiveRole/GiveOrganizer';
import EventManager from './components/EventManager/EventManager';
import EditEvent from './components/EditEvent/EditEvent';
import OrganizerPage from './components/OrganizerPage/OrganizerPage';
import OrganizerStatistics from './components/OrganizerStatistics/OrganizerStatistics';
import CreateQr from './components/CreateQR/CreateQr';
import EventQrPage from './components/EventQrPage/EventQrPage';
import MarkAtendee from './components/MarkAtendee/MarkAtendee';


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
    path: "/profile",
    element: <Profilepage />
  },
  {
    path: "/forgotpassword",
    element: <h1 style={{color: "black"}}>Тут будет восстановление пароля</h1>
  },
  {
    path: "/rating",
    element: <Ratingpage />
  },
  {
    path: "/event",
    element: <Eventpage />
  },
  {
    path: "create-evt",
    element: <Createevt />
  },
  {
    path: "/admin",
    element: <Adminpage />
  },
  {
    path: "/admin/statistics",
    element: <Statisticpage />
  },
  {
    path: "/admin/event-statistics",
    element: <Eventstatpage />
  },
  {
    path: "/admin/reg-admin",
    element: <RegisterAdmin />
  },
  {
    path: "/admin/reg-organizer",
    element: <RegisterOrganizer />
  },
  {
    path: "/admin/give-admin",
    element: <GiveAdmin />
  },
  {
    path: "/admin/give-organizer",
    element: <GiveOrganizer />
  },
  {
    path: "/admin/event-manager",
    element: <EventManager getEventsUrl={'/api/event/all'}/>
  },
  {
    path: "/edit-event",
    element: <EditEvent />
  },
  {
    path: "/organizer",
    element: <OrganizerPage />
  },
  {
    path: '/organizer/statistics',
    element: <OrganizerStatistics />
  },
  {
    path: '/organizer/event-manager',
    element: <EventManager getEventsUrl={'/api/event/my'}/>
  },
  {
    path: '/event-qr',
    element: <EventQrPage />
  },
  {
    path: '/mark-atendee',
    element: <MarkAtendee />
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
