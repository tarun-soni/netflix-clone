import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";

const CircularProgress = ({ percentage }) => {
  return (
    <>
      <ProgressProvider valueStart={0} valueEnd={percentage * 10}>
        {(percentage) => (
          <CircularProgressbar
            value={percentage}
            text={`${percentage / 10}`}
            styles={buildStyles({
              textColor: "white",
              // pathColor: "#E50914",
              pathColor: "#e31720",
              // trailColor: "#1c1c1c",
              trailColor: "#3d3d3d",
            })}
          />
        )}
      </ProgressProvider>
    </>
  );
};

export default CircularProgress;
