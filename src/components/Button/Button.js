import React from "react";


function Button({ buttoncustomize }) {
  return (
    <button type="button" class="btn btn-secondary" style={buttoncustomize.style}>
      {buttoncustomize.name}
    </button>
  );
}

export default Button;
