import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";
const CircularProgress = ({ percentage }) => {
  return (
    <>
      <ChangingProgressProvider values={[percentage * 10]}>
        {(percentage) => (
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            textColor="#f88"
            trailColor="#d6d6d6"
            style={{
              backgroundColor: "#3e98c7",
            }}
          />
        )}
      </ChangingProgressProvider>
    </>
  );
};

export default CircularProgress;
