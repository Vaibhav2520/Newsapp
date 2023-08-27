import React from "react";

import "../styles/InputControl.css";

function InputControl(props) {
  return (
    <div className="container-inputcontrol">
      {props.label && <label>{props.label}</label>}
      <input type="text" {...props} />
    </div>
  );
}

export default InputControl;
