import React from "react";

const Heros: React.FC = () => {
  return (
    <>
      <div
        className="hero min-h-[575px] md:min-h-[434px] mb-6"
        style={{
          backgroundImage: "url(/src/assets/herosBg.jpg)",
        }}></div>
    </>
  );
};

export default Heros;
