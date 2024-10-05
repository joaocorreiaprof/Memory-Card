import { useState } from "react";

function Scores() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const addPoint = () => {
    setCurrentScore(currentScore + 1);
  };

  const checkBest = () => {
    if (currentScore >= bestScore) {
      setBestScore(currentScore);
    }
  };

  const handleClick = () => {
    addPoint();
    checkBest();
  };

  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
      <p>Current score: {currentScore}</p>
      <p>Best score: {bestScore}</p>
    </div>
  );
}

export default Scores;
