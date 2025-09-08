// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import CyberResilienceScorecard from "./CyberResilienceScorecard";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <CyberResilienceScorecard />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root"),
);
