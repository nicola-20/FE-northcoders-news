import React from 'react';
import { Link } from '@reach/router'
import '../App.css';
import './css/Header.css';

const Header = () => {
  return (
    <header className="Header">
    <h1>
      <Link to="/"><span className="northcoders"><span id="N">N</span>orthcoders/</span><span className="news">news</span></Link>
    </h1>
  </header>
  );
};

export default Header;