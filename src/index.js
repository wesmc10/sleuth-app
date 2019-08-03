import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App/App';
import Favicon from 'react-favicon';

ReactDOM.render(
    <BrowserRouter>
        <Favicon url="https://gitlab.computing.dcu.ie/uploads/-/system/project/avatar/904/fa-user-secret-200.png" />
        <App />
    </BrowserRouter>,
document.getElementById('root'));