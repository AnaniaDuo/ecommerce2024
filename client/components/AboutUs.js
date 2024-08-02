import React from "react";
import AboutUsCard from "./AboutUsCard";
import { ABOUT_US_INFO, ABOUT_US_LONG_DETAILS } from "./utilities.js/constants";

function AboutUs() {
  return (
    <div className="-mx-6 bg-gray-200">
      <div className="h-screen bg-cover bg-center bg-[url('../public/background1.png')] -mt-2"></div>
      <div className="flex gap-24 justify-center py-12  ">
        {ABOUT_US_INFO.map((info) => (
          <AboutUsCard info={info} />
        ))}
      </div>

      <div className="relative h-screen bg-cover bg-center text-gray-900 px-24">
        {/* Background image with reduced opacity */}
        <div className="absolute inset-0 bg-[url('../public/tea-cups1.png')] opacity-25"></div>

        {/* Content with clear text */}
        <div className="relative flex items-center gap-8">
          <div className="flex gap-8 rounded-3xl px-6 pt-12 text-justify text-lg">
            <div>{ABOUT_US_LONG_DETAILS}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
