import { GetCharacters } from "./components/characters";
import Scores from "./components/trackScores";
import "./App.css";
import Music from "./components/backgroundMusic";
import backgroundMusic from "./assets/audio/ways-of-wizard.mp3";
import MagicTrail from "./components/magicTrail";
import Menu from "./components/main-menu";

const App = () => {
  return (
    <div>
      <audio id="background-music" autoPlay loop>
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Music />
      <MagicTrail />
      <Menu />
    </div>
  );
};

export default App;
