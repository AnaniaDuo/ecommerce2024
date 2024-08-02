import React from "react";
import AboutUsCard from "./AboutUsCard";
import { ABOUT_US_INFO } from "./utilities.js/constants";

function AboutUs() {
  return (
    <div>
      <div className="h-screen bg-cover bg-center bg-[url('../public/background1.png')] -mx-6 -mt-2"></div>
      <div className="flex gap-24 justify-center py-6 bg-gray-200 -mx-6">
        {ABOUT_US_INFO.map((info) => (
          <AboutUsCard info={info} />
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
