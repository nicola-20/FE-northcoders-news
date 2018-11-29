import React from "react";
import ReactLoading from "react-loading";
import "./css/Loading.css";

const Loading = ({ type, color }) => {
  return (
    <main className="loading-page">
      <h1>LOADING</h1>
      <ReactLoading
        type={"spinningBubbles"}
        color={"#AC3036"}
        height={"15%"}
        width={"15%"}
      />
    </main>
  );
};

export default Loading;
