import React from "react";
import Cardjoyabout from "./Cardjoyabout";

const About = () => {
  const leaderDetail = [
    {
      img: "/E-commerce/public/img",
      name: "Rohan Shrestha",
      description:
        "Hello I the designer and the creator of this website.I have written code and design this website.",
    },
    {
      img: "/E-commerce/public/img",
      name: "Hamsy Shrestha",
      description:
        "Hello I am the Biggest contributor of this website.I have Added more than 30+ Product.",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",

        marginTop: "2rem",
      }}
    >
      <div
        style={{
          width: "800px",
          background: " #f3fde8",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
          Our Mission
        </h1>

        <p style={{ textAlign: "center", fontSize: "20px" }}>
          At the heart of our mission is a commitment to catalyzing positive
          change and fostering innovation. We strive to empower individuals and
          organizations by providing cutting-edge solutions and unparalleled
          support. Our dedication to excellence is woven into every facet of our
          work, from developing transformative technologies to cultivating a
          collaborative and inclusive community. With a passion for pushing
          boundaries, we aim to inspire creativity and drive meaningful impact
          in the world. At the core of our mission is the belief that through
          shared knowledge, relentless curiosity, and a collaborative spirit, we
          can contribute to a future where possibilities are limitless, and
          challenges are met with ingenuity and resilience.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {leaderDetail.map((item, index) => {
            return <Cardjoyabout key={{ index }} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
