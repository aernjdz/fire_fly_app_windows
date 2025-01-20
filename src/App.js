import React from 'react';

import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainWindow/MainLayout';
import AboutWindow from './components/AboutWindow/AboutWindow';
import Layout from './components/Layout/Layout';
import DeveloperWindow from './components/developer/DeveloperInfo';
import SettingsWindow from './components/settingswindow/settingswindow';
import QueueStatistic from './components/QueueStatistic';  // Import the new component

import './App.css';
function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<MainLayout />} />
          <Route path="/about" element={<AboutWindow />} />
          <Route path="/about/author" element={<DeveloperWindow />} />
          <Route path="/settings" element={<SettingsWindow />} />
          <Route path="/queues/cherga/:id" element={<QueueStatistic />} />  {/* Add the new route */}
        </Route>
      </Routes>
  );
}

export default App;
