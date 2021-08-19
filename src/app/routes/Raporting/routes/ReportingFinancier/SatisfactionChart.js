import React from "react";
import ProgressBar from "./Progress-bar.js";

const testData = [
  { color: "#F9972D", percentage: 60 },
  { color: "#F9972D", percentage: 30 },
  { color: "#F9972D", percentage: 53 },
  { color: "#F9972D", percentage: 60 },
  { color: "#F9972D", percentage: 30 },
  { color: "#F9972D", percentage: 53 },
  { color: "#F9972D", percentage: 60 },
  { color: "#F9972D", percentage: 30 },
  { color: "#3BBDD5", percentage: 53 }
];

function SatisfactionChart() {
  return (
    <div className="App">
      {testData.map((item, idx) => (
        <ProgressBar key={idx} color={item.color} percentage={item.percentage} />
      ))}
    </div>
  );
}

export default SatisfactionChart;
