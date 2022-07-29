import React from "react";

const CardStyle = {
  border: "5px solid #f1976b",
  borderRadius: "30px",
  padding: "20px",
  margin: "20px",
  width: "270px",
  height: "170px",
};

function Card(props) {

  return (
    <>
      <div
        style={CardStyle}
        className="CardBack"
      >
        <p>{props.back}</p>
      </div>
    </>
  );
}

export default Card;
