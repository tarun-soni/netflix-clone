import React from "react";

const Loader = () => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        syle={{ margin: "auto", background: "#fff", display: "block" }}
        width="193px"
        height="193px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#E50914"
          strokeWidth="2"
          r="16"
          strokeDasharray="75.39822368615503 27.132741228718345"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.8474576271186441s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>{" "}
    </span>
  );
};
export default Loader;
