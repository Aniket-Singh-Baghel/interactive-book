import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ScrollToTop from './Components/ScrollToTop';

import Acknowledgement from './Components/Acknowledgement';
import Introduction from './Components/WhatIsIct';

import Part1 from './Components/Part1'
import Part2 from './Components/Part2'
import Part3 from './Components/Part3'
import Part4 from './Components/Part4'
import Part5 from './Components/Part5'
import Part6 from './Components/Part6'

import Chapter1 from './Components/Part1/Chapter1';
import UsesOfComputers from './Components/Part1/Extras/UsesOfComputers'
import Chapter2 from './Components/Part1/Chapter2';
import Chapter3 from './Components/Part1/Chapter3';
import Chapter4 from './Components/Part1/Chapter4';
import Chapter5 from './Components/Part1/Chapter5';
import Peripherals from './Components/Part1/Extras/Peripharals';
import TertiaryStorage from './Components/Part1/Extras/Tertiary_Storage';
import OtherStorageTypes from './Components/Part1/Extras/OtherStorageTypes';
import MemoryComparison from './Components/Part1/Extras/MemoryComaparison';
import RamVsRom from './Components/Part1/Extras/RamVsRom';
import MemoryUnits from './Components/Part1/Extras/MemoryUnits';
import PortsAndConnectors from './Components/Part1/Extras/PortsAndConnectors';
import HistoryOfComputers from './Components/Part1/Extras/HistoryOfComputers';
import TypesOfComputers from './Components/Part1/Extras/TypesOfComputers';
import Quiz1 from './Components/Part1/Quiz1';

import Chapter6 from './Components/Part2/Chapter6';
import Chapter7 from './Components/Part2/Chapter7';
import Chapter8 from './Components/Part2/Chapter8';
import DevloperRole from './Components/Part2/devloperRole'
import Sdlc from './Components/Part2/Sdlc';
import ProgrammingLanguage from './Components/Part2/ProgrammingLanguage'
import DataStructures from './Components/Part2/DataStructures';
import Algorithms from './Components/Part2/Algorithms';
import DesignPrinciples from './Components/Part2/DesignPrinciples';
import UiUx from './Components/Part2/Ui_Ux';
import FrontendDevelopment from './Components/Part2/FrontendDevelopment';
import BackendDevelopment from './Components/Part2/Backend';
import Databases from './Components/Part2/Databases';
import VersionControl from './Components/Part2/VersionControl';
import DebuggingTestingModule from './Components/Part2/DebuggingTestingModule';
import Quiz2 from './Components/Part2/Quiz2';

import Chapter9 from './Components/Part3/Chapter9';
import Chapter10 from './Components/Part3/Chapter10';
import Chapter11 from './Components/Part3/Chapter11';
import Chapter12 from './Components/Part3/Chapter12';
import Chapter15 from './Components/Part5/Chapter15';
import Chapter16 from './Components/Part5/Chapter16';
import ErrorAnimation from './Components/error';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Acknowledgement />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/station" element={<App />} />
        <Route path="/parts/prt1" element={<Part1 />} />
        <Route path="/parts/prt2" element={<Part2 />} />
        <Route path="/parts/prt3" element={<Part3 />} />
        <Route path="/parts/prt4" element={<Part4 />} />
        <Route path="/parts/prt5" element={<Part5 />} />
        <Route path="/parts/prt6" element={<Part6 />} />

        <Route path="/part1/what-is-computer" element={<Chapter1 />} />
        <Route path="/part1/uses-of-computer" element={<UsesOfComputers />} />
        <Route path="/part1/computer-hardware" element={<Chapter2 />} />
        <Route path="/part1/cpu-brain" element={<Chapter3 />} />
        <Route path="/part1/memory-and-storage" element={<Chapter4 />} />
        <Route path="/part1/input-output-devices" element={<Chapter5 />} />
        <Route path="/part1/peripherals" element={<Peripherals />} />
        <Route path="/part1/tertiary-storage" element={<TertiaryStorage />} />
        <Route path="/part1/other-storage-types" element={<OtherStorageTypes />} />
        <Route path="/part1/ram-vs-rom" element={<RamVsRom />} />
        <Route path="/part1/memory-comparison" element={<MemoryComparison />} />
        <Route path="/part1/memory-units" element={<MemoryUnits />} />
        <Route path="/part1/ports-and-connectors" element={<PortsAndConnectors />} />
        <Route path="/part1/history-of-computers" element={<HistoryOfComputers />} />
        <Route path="/part1/types-of-computers" element={<TypesOfComputers />} />
        <Route path="/part1/chapters/qiz1" element={<Quiz1 />} />
        
        
        <Route path="/module1/what-is-software" element={<Chapter6 />} />
        <Route path="/module1/operating-system" element={<Chapter7 />} />
        <Route path="/module1/types-of-software" element={<Chapter8 />} />

        <Route path="/module2/developer-role" element={<DevloperRole />} />
        <Route path="/module2/sdlc" element={<Sdlc />} />
        <Route path="/module2/programming-languages" element={<ProgrammingLanguage />} />
        <Route path="//module2/data-structures" element={<DataStructures />} />
        <Route path="/module2/algorithms" element={<Algorithms />} />

        <Route path="/module3/design-principles" element={<DesignPrinciples />} />
        <Route path="/module3/ui-ux" element={<UiUx />} />
        <Route path="/module3/frontend" element={<FrontendDevelopment />} />
        <Route path="/module3/backend" element={<BackendDevelopment />} />
        <Route path="/module3/databases" element={<Databases />} />
        
        <Route path="/module4/version-control" element={<VersionControl />} />
        <Route path="/module4/testing" element={<DebuggingTestingModule />} />
        <Route path="/part2/chapters/qiz2" element={<Quiz2 />} />

        <Route path="/part3/chapters/ch9" element={<Chapter9 />} />
        <Route path="/part3/chapters/ch10" element={<Chapter10 />} />
        <Route path="/part3/chapters/ch11" element={<Chapter11 />} />
        <Route path="/part3/chapters/ch12" element={<Chapter12 />} />
        <Route path="/part5/chapters/ch15" element={<Chapter15 />} />
        <Route path="/part5/chapters/ch16" element={<Chapter16 />} />
        <Route path="/error404" element={<ErrorAnimation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
