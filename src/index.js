import React from 'react';
import ReactDOM from 'react-dom';

import './resources/css/app.css';
import App from './components/App';
import { firebase } from './firebase';

firebase.auth().onAuthStateChanged((user) => {
	ReactDOM.render(<App user={user}/>, document.querySelector('#root'));
});