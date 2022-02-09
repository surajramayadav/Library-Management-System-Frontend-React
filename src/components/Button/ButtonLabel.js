import React from "react"


function ButtonLabel({ buttoncustomize1 }) {
  return (
    <button type="button" class="btn btn-secondary" style={buttoncustomize1.style}>
        {buttoncustomize1.lefticon}
        {buttoncustomize1.name}
        {buttoncustomize1.righticon}
    </button>
  );
}

export default ButtonLabel;
