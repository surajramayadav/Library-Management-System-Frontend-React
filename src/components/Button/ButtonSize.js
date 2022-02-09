import React from "react";


function ButtonSize({ buttoncustomize2 }) {
  return (
    <button type="button" class={buttoncustomize2.class} style={buttoncustomize2.style}>
      {buttoncustomize2.name}
    </button>
  );
}

export default ButtonSize;
