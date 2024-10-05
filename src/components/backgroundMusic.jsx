import { useState, useEffect } from "react";
import "../styles/musicButton.css";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = document.getElementById("background-music");
    audio.play();
    setIsPlaying(!audio.paused);
  }, []);

  const togglePlay = () => {
    const audio = document.getElementById("background-music");
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <button className="music-button" onClick={togglePlay}>
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
    </div>
  );
};

export default Music;
