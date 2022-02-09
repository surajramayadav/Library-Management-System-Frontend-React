import React from "react"


function ButtonStyle({ buttoncustomize3 }) {
  return (
    <button type="button" class="btn btn-secondary" style={buttoncustomize3.style}>
        {buttoncustomize3.icon}
        {buttoncustomize3.name}
    </button>
  );
}

export default ButtonStyle;
