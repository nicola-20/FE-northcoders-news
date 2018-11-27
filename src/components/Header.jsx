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
          <Link to="/">Northcoder News</Link>
        </h1>
      </header>
		);
	}
}

// Header.propTypes = {

// };

export default Header;