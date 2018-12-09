import React from "react";
import {
  faExclamationTriangle,
  faSadTear
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/ErrorPage.css";
import { Link } from "@reach/router";

const Error = props => {
  const { code, message } = props.location.state;
  console.log(props.location.state);
  return (
    <div className="error">
      <h1>
        <FontAwesomeIcon icon={faExclamationTriangle} className="icon" /> <span id="err">{code}</span> {" "}
        {"ERROR"}
      </h1>
      <p>Something went wrong...</p>
      <p>{message}</p>
      <FontAwesomeIcon icon={faSadTear} className="icon" />
      <p id="home-link">
        Take me <Link to="/">HOME!</Link>
      </p>
    </div>
  );
};

export default Error;
