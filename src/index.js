import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Part1 from './chapters/Part1'
import Part2 from './chapters/Part2'
import Part3 from './chapters/Part3'
import Part4 from './chapters/Part4'
import Part5 from './chapters/Part5'
import Chapter1 from './chapters/Chapter1';
import Chapter2 from './chapters/Chapter2';
import Chapter3 from './chapters/Chapter3';
import Chapter4 from './chapters/Chapter4';
import Chapter5 from './chapters/Chapter5';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/parts/prt1" element={<Part1 />} />
        <Route path="/parts/prt2" element={<Part2 />} />
        <Route path="/parts/prt3" element={<Part3 />} />
        <Route path="/parts/prt4" element={<Part4 />} />
        <Route path="/parts/prt5" element={<Part5 />} />
        <Route path="/chapters/ch1" element={<Chapter1 />} />
        <Route path="/chapters/ch2" element={<Chapter2 />} />
        <Route path="/chapters/ch3" element={<Chapter3 />} />
        <Route path="/chapters/ch4" element={<Chapter4 />} />
        <Route path="/chapters/ch5" element={<Chapter5 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
