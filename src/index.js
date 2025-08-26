import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Part1 from './Components/Part1'
import Part2 from './Components/Part2'
import Part3 from './Components/Part3'
import Part4 from './Components/Part4'
import Part5 from './Components/Part5'
import Chapter1 from './Components/Part1/Chapter1'
import Chapter2 from './Components/Part1/Chapter2';
import Chapter3 from './Components/Part1/Chapter3';
import Chapter4 from './Components/Part1/Chapter4';
import Chapter5 from './Components/Part1/Chapter5';
import Peripherals from './Components/Part1/Extras/Peripharals';
import TertiaryStorage from './Components/Part1/Extras/Tertiary_Storage'
import OtherStorageTypes from './Components/Part1/Extras/OtherStorageTypes'
import MemoryComparison from './Components/Part1/Extras/MemoryComaparison'
import RamVsRom from './Components/Part1/Extras/RamVsRom'
import Quiz1 from './Components/Part1/Quiz1'
import Chapter6 from './Components/Part2/Chapter6'
import Chapter7 from './Components/Part2/Chapter7'
import Chapter8 from './Components/Part2/Chapter8'
import Quiz2 from './Components/Part2/Quiz2'
import Chapter9 from './Components/Part3/Chapter9'
import Chapter10 from './Components/Part3/Chapter10'
import Chapter11 from './Components/Part3/Chapter11'
import Chapter12 from './Components/Part3/Chapter12';
import Chapter15 from './Components/Part4/Chapter15';

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
        <Route path="/part1/chapters/ch1" element={<Chapter1 />} />
        <Route path="/part1/chapters/ch2" element={<Chapter2 />} />
        <Route path="/part1/chapters/ch3" element={<Chapter3 />} />
        <Route path="/part1/chapters/ch4" element={<Chapter4 />} />
        <Route path="/part1/chapters/ch5" element={<Chapter5 />} />
        <Route path="/part1/chapters/peripherals" element={<Peripherals />} />
        <Route path="/part1/chapters/tertriaryStorage" element={<TertiaryStorage />} />
        <Route path="/part1/chapters/otherStorageTypes" element={<OtherStorageTypes />} />
        <Route path="/part1/chapters/memoryComparison" element={<MemoryComparison />} />
        <Route path="/part1/chapters/ramVsRom" element={<RamVsRom />} />
        <Route path="/part1/chapters/qiz1" element={<Quiz1 />} />
        <Route path="/part2/chapters/ch6" element={<Chapter6 />} />
        <Route path="/part2/chapters/ch7" element={<Chapter7 />} />
        <Route path="/part2/chapters/ch8" element={<Chapter8 />} />
        <Route path="/part2/chapters/qiz2" element={<Quiz2 />} />
        <Route path="/part3/chapters/ch9" element={<Chapter9 />} />
        <Route path="/part3/chapters/ch10" element={<Chapter10 />} />
        <Route path="/part3/chapters/ch11" element={<Chapter11 />} />
        <Route path="/part3/chapters/ch12" element={<Chapter12 />} />
        <Route path="/part4/chapters/ch15" element={<Chapter15 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
