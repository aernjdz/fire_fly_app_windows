import React, { useState, useEffect } from 'react';
import { FaHome, FaListAlt, FaArrowDown } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [activeTab, setActiveTab] = useState('');

  // Set active tab based on current location
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('tab1');
    } else if (location.pathname === '/about') {
      setActiveTab('tab2');
    } else if (location.pathname === '/settings') {
      setActiveTab('tab5');
    }
  }, [location]);

  const handleTabClick = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="hover-zone">
      <div className='arrowan'>
        <FaArrowDown className='animarrow'/>
        </div>
    <div className="tab-menu-container">
      <div className="tab-menu">
        <div
          className={`tab-item ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab1', "/")}
          style={{ color: activeTab === 'tab1' ? 'active' : '' }} // Green if active
        >
          <FaHome />
        </div>
        <div
          className={`tab-item ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab2', "/about")}
          style={{ color: activeTab === 'tab2' ? 'active' : '' }} // Green if active
        >
          <FaListAlt />
        </div>
        {/* <div
          className={`tab-item ${activeTab === 'tab5' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab5', "/settings")}
          style={{ color: activeTab === 'tab5' ? 'active' : '' }} // Green if active
        >
          <FaCog />
        </div> */}
    
      </div>
    
    </div>
    </div>
  );
};

export default Menu;
