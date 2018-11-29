import React, { Component } from 'react';
import { Link } from '@reach/router'
// import PropTypes from 'prop-types';
import '../App.css';
import './css/Header.css';

class Header extends Component {
	render() {
		return (
			<header className="Header">
        <h1>
          {/* <Link to="/"><span id="N">N</span>orthcoders <span id="N">N</span>ews</Link> */}
          <Link to="/"><span className="northcoders"><span id="N">N</span>orthcoders/</span><span className="news">news</span></Link>
        </h1>
      </header>
		);
	}
}

// Header.propTypes = {

// };

export default Header;