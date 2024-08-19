import React from "react";
import AboutUsCard from "./AboutUsCard";
import Footer from "./Footer";
import { ABOUT_US_INFO, ABOUT_US_LONG_DETAILS } from "./utilities/constants";

function AboutUs() {
  return (
    <div className="-mx-6 bg-gray-200">
      <div className="h-screen bg-cover bg-center bg-[url('https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/520b65a3-2fc1-4851-8513-f1b46cc3938a/image1.jpg')] "></div>
      {/* <div className="h-screen bg-cover bg-center bg-[url('../public/background.png')] -mt-2"></div> */}
      <div className="flex gap-24 justify-center py-12  ">
        {ABOUT_US_INFO.map((info) => (
          <AboutUsCard info={info} />
        ))}
      </div>

      <div className="relative h-screen bg-cover bg-center text-gray-900 px-24">
        {/* Background image with reduced opacity */}
        <div className="absolute inset-0 bg-[url('../public/tea-cups.png')] opacity-25"></div>

        {/* Content with clear text */}
        <div className="relative flex items-center gap-8">
          <div className="flex gap-8 rounded-3xl px-6 pt-12 text-justify text-lg">
            <div>{ABOUT_US_LONG_DETAILS}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
