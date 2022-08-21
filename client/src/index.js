import React from 'react';
// import ReactDOM from 'react-dom/client';
import { render } from "react-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.scss';
import App from './App';
import store from './Store';
import HomePage from './Components/HomePage';
import RoomManagement from './Components/room-management/room-management';
import ChatRoom from './Components/chat-room/chat-room';
import TodoList from './Components/todo-list/todo-list';
import Schedule from './Components/schedule-management/schedule-management';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';


const root = document.getElementById('root');
render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="home" element={<HomePage selectedTab='room' title='Room Management' />} />
        <Route path="room-management" element={<RoomManagement selectedTab='room' title='Room Management'/>} />
        <Route path="chat-room" element={<ChatRoom selectedTab='chat' title='Chat Room'/>} />
        <Route path="todo-list" element={<TodoList selectedTab='todo' title=' Todo Lists'/>} />
        <Route path="schedule" element={<Schedule selectedTab='schedule' title='Tasks'/>} />
      </Routes>
    </BrowserRouter>
  </Provider>
,root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
