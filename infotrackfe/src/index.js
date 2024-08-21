import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import SearchFrom from "./view/Search.js";
import RecordFrom from "./view/Records.js";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( <BrowserRouter>
  <Routes>
      <Route path="/" element={<SearchFrom />} />
      <Route path="/records" element={<RecordFrom />} />
  </Routes>
</BrowserRouter>
);
