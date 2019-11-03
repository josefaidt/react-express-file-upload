import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FormContextProvider from './util/FormContext'

ReactDOM.render(<FormContextProvider><App /></FormContextProvider>, document.getElementById('root'));
