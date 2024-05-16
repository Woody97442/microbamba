import React from "react";

const Heros: React.FC = () => {
  const domain = window.location.origin;
  return (
    <>
      <div
        className="hero min-h-[575px] md:min-h-[434px] mb-6"
        style={{
          backgroundImage: `url(${domain}/images/herosBg.jpg)`,
        }}></div>
    </>
  );
};

export default Heros;
