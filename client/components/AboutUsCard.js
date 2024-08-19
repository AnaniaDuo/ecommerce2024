import React from "react";
import TrackVisibility from "react-on-screen";
import "animate.css";

function AboutUsCard({ info }) {
  const { title, details, image } = info;
  return (
    <div className=" w-96">
      <TrackVisibility>
        {({ isVisible }) => (
          <div
            className={`flex justify-center ${
              isVisible && "animate__animated animate__zoomIn"
            }`}
          >
            <img className="w-80 h-80 mb-4" src={image} />
          </div>
        )}
      </TrackVisibility>
      <h3 className="text-xl font-bold text-center text-gray-700">{title}</h3>
      <p className="text-justify text-gray-500">{details}</p>
    </div>
  );
}

export default AboutUsCard;
