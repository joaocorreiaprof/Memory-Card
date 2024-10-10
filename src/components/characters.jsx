import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/characters.css";
import hogwartsImage from "../assets/images/hogwarts.jpg";
import taca from "../assets/images/taca.jpg";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function GetCharacters() {
  const [images, setImages] = useState({});
  const [shuffledCards, setShuffledCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const totalPairs = 9;

  useEffect(() => {
    const getCharactersImages = async () => {
      try {
        const res = await axios.get(
          "https://hp-api.onrender.com/api/characters"
        );
        const characterNames = [
          "Harry Potter",
          "Hermione Granger",
          "Ron Weasley",
          "Draco Malfoy",
          "Minerva McGonagall",
          "Cedric Diggory",
          "Rubeus Hagrid",
          "Lord Voldemort",
          "Cho Chang",
        ];

        const characterImages = {};
        characterNames.forEach((name) => {
          const character = res.data.find((char) => char.name === name);
          if (character) {
            characterImages[name] = character.image;
          }
        });

        setImages(characterImages);

        const pairsArray = characterNames.flatMap((name) =>
          [...Array(2)].map((_, index) => ({ name, id: `${name}-${index}` }))
        );

        const shuffled = shuffleArray(pairsArray);
        setShuffledCards(shuffled);
      } catch (err) {
        console.log(err);
      }
    };

    getCharactersImages();
  }, []);

  const handleClick = (name, index) => {
    const cardId = `${name}-${index}`;

    if (foundPairs.includes(name) || clickedCards.includes(cardId)) {
      return;
    }

    setClickedCards((prev) => {
      const newClickedCards = [...prev, cardId];

      if (newClickedCards.length === 2) {
        const [firstCard, secondCard] = newClickedCards;

        if (firstCard.split("-")[0] === secondCard.split("-")[0]) {
          setFoundPairs((prevFoundPairs) => {
            if (!prevFoundPairs.includes(name)) {
              return [...prevFoundPairs, name];
            }
            return prevFoundPairs;
          });
        }

        setTimeout(() => setClickedCards([]), 700);
      }

      return newClickedCards;
    });
  };

  useEffect(() => {
    console.log("Found pairs:", foundPairs);

    if (foundPairs.length === totalPairs) {
      setGameOver(true);
      console.log("All pairs found! Game over.");
    }
  }, [foundPairs]);

  const resetGame = () => {
    setFoundPairs([]);
    setClickedCards([]);
    setGameOver(false);
    setShuffledCards(shuffleArray(shuffledCards));
  };

  return (
    <div>
      {!gameOver ? (
        <div className="character-container">
          {shuffledCards.map(({ name, id }) => {
            const isFlipped =
              clickedCards.includes(id) || foundPairs.includes(name);

            return (
              <img
                key={id}
                src={isFlipped ? images[name] : hogwartsImage}
                alt={name}
                className={`characters-images ${
                  foundPairs.includes(name) ? "found" : ""
                }`}
                onClick={() => handleClick(name, id.split("-")[1])}
                style={{
                  pointerEvents: foundPairs.includes(name) ? "none" : "auto",
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="end-game">
          <h1>Victory!</h1>
          <img src={taca} alt="Victory Image" className="vicotry-cup" />
          <button onClick={resetGame} className="restart-button">
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}

export { GetCharacters };
