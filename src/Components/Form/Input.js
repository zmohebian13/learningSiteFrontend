import React from "react";
import "./Input.css";

export default function Input(props) {
  const element =
    props.elementType === "input" ? (
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        className={props.className}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    ) : (
      <textarea placeholder={props.placeholder} className={props.className} />
    );
  return <div>{element}</div>;
}
