import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div className="bg-gray-100 h-full">
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
