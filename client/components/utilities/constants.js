import React from "react";

export const TOKEN = "token";

export const ABOUT_US_INFO = [
  {
    title: "We Celebrate Our People",
    details:
      " We believe that our people are the heart of our company. We celebrate our dedicated team through various initiatives, including regular appreciation events, professional development opportunities, and a supportive work environment that encourages creativity and growth. By recognizing individual achievements and fostering a sense of community, we ensure that every team member feels valued and inspired to contribute to our shared success. Together, we cultivate not just the finest teas, but also a culture of respect and celebration.",
    image: "people.png",
  },
  {
    title: "We Protect and Nuture our Planet",
    details:
      "Our commitment to sustainability goes beyond crafting exceptional teas. We actively protect and regrow more trees to nurture our planet. Through dedicated reforestation programs and partnerships with environmental organizations, we plant thousands of trees annually, ensuring that we give back to the Earth that provides so much for us. By integrating sustainable practices in every aspect of our operations, we strive to preserve natural habitats, reduce our carbon footprint, and create a greener, healthier world for future generations.",
    image: "environment.png",
  },
];

export const ABOUT_US_LONG_DETAILS = (
  <div style={{ letterSpacing: "0.8px" }} className="font-thin">
    <p className="text-xl font-bold text-gray-700">Welcome to Positivitea!</p>
    <br />
    <p>
      At Positivitea, we believe that a cup of tea can bring positivity and
      harmony to your day. Founded in 1989 by the passionate and tea-loving Li
      Na, our company has been dedicated to serving premium, high-quality teas
      that not only delight the senses but also contribute to the well-being of
      our planet.
    </p>
    <p>
      Li Na, whose love for tea and Zen inspired her to create Positivitea,
      envisioned a company where every sip of tea could bring a moment of
      tranquility and joy. Her journey began with a deep appreciation for the
      natural world and a desire to give back. This passion led her to establish
      Positivitea, where we proudly offer 12 exquisite flavors, each crafted to
      provide a unique and enriching experience.
    </p>
    <br />
    <p>
      Our commitment extends beyond just providing exceptional tea. We are
      devoted to making a positive impact on the environment. A portion of our
      profits is dedicated to reforesting efforts, helping to plant and nurture
      more trees around the globe. By choosing Positivitea, you are not only
      indulging in the finest teas but also contributing to a greener, healthier
      planet.\nDiscover our range of flavors and join us on a journey of taste,
      mindfulness, and environmental stewardship. At Positivitea, every cup is
      brewed with care, compassion, and a touch of positivity.{" "}
    </p>
    <br />
    <br />
    <p>Sip, relax, and make a difference with Positivitea.</p>
  </div>
);

export const inputStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
