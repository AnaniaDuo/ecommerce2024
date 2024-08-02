import React from "react";

function AboutUsCard({ info }) {
  const { title, details, image } = info;
  return (
    <div className=" w-80">
      <img className="w-80 h-80" src={image} />
      <h3 className="text-xl font-bold text-center text-gray-700">{title}</h3>
      <p className="text-justify text-gray-500">{details}</p>
    </div>
  );
}

export default AboutUsCard;
