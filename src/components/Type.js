import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Gesù",
          "Amore",
          "Perdonato",
          "Adornare",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
       
      }}
    />
  );
}

export default Type;
