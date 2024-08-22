import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import SearchForm from "./view/Search.js";
import RecordForm from "./view/History.js";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( <BrowserRouter>
  <Routes>
      <Route path="/" element={<SearchForm />} />
      <Route path="/history" element={<RecordForm />} />
  </Routes>
</BrowserRouter>
);
