import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/characters.css";
import hogwartsImage from "../assets/images/hogwarts.jpg";

// Função para embaralhar o array (algoritmo Fisher-Yates)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function GetCharacters() {
  const [images, setImages] = useState({});
  const [shuffledCards, setShuffledCards] = useState([]); // Armazena as cartas embaralhadas
  const [clickedCards, setClickedCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);

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

        // Criar um array com pares de personagens
        const pairsArray = characterNames.flatMap((name) =>
          [...Array(2)].map((_, index) => ({ name, id: `${name}-${index}` }))
        );

        // Embaralhar os pares
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
          setFoundPairs((prevFoundPairs) => [...prevFoundPairs, name]);
        }

        setTimeout(() => setClickedCards([]), 500);
      }

      return newClickedCards;
    });
  };

  return (
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
  );
}

export { GetCharacters };
