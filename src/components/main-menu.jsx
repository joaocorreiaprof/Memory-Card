import { useState } from "react";
import { GetCharacters } from "./characters";

const Menu = () => {
  const [showCharacters, setShowCharacters] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleStartGame = () => {
    setShowCharacters(true);
    setButtonDisabled(true);
  };

  return (
    <div>
      <button
        className="start-button"
        onClick={handleStartGame}
        disabled={isButtonDisabled}
      >
        Start Game
      </button>
      {showCharacters && <GetCharacters />}
    </div>
  );
};

export default Menu;
