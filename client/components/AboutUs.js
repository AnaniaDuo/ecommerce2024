import React from "react";
import AboutUsCard from "./AboutUsCard";
import Footer from "./Footer";
import { ABOUT_US_INFO, ABOUT_US_LONG_DETAILS } from "./utilities/constants";
import TrackVisibility from "react-on-screen";
import "animate.css";

function AboutUs() {
  return (
    <div className="-mx-6 bg-gray-200">
      <div
        className="h-screen w-screen bg-cover bg-center bg-[url('https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/520b65a3-2fc1-4851-8513-f1b46cc3938a/image1.jpg')] "
        style={{ marginTop: "-112px" }}
      >
        <TrackVisibility>
          {({ isVisible }) => (
            <h1
              className={`h-screen flex items-center justify-center align-center text-white ${
                isVisible && "animate__animated animate__pulse"
              }`}
            >
              Welcome to Positivitea
            </h1>
          )}
        </TrackVisibility>
      </div>

      {/* <div className="h-screen bg-cover bg-center bg-[url('../public/background.png')] -mt-2"></div> */}
      <div className="flex gap-24 justify-center py-12 bg-white">
        {ABOUT_US_INFO.map((info) => (
          <AboutUsCard info={info} />
        ))}
      </div>

      {/* <div className="relative h-screen bg-cover bg-center text-gray-900"> */}
      {/* Background image with reduced opacity */}
      {/* <div className="absolute inset-0 bg-[url('../public/tea-cups.png')] opacity-25"></div> */}

      {/* Content with clear text */}
      <div className="relative flex items-center gap-8 bg-yellow-800 px-24 py-12 text-white">
        {/* <div className="relative flex items-center gap-8 bg-gradient-to-r from-gray-500 to-orange-400 px-24 py-12 text-white"> */}
        <div className="flex gap-8 rounded-3xl text-justify text-lg">
          <div>{ABOUT_US_LONG_DETAILS}</div>
        </div>
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default AboutUs;
