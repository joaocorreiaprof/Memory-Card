import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/characters.css";
import hogwartsImage from "../assets/images/hogwarts.jpg";

function GetCharacters() {
  const [images, setImages] = useState({});
  const [clickedCards, setClickedCards] = useState([]);
  const [alreadyMatch, setAlreadyMatch] = useState([]);
  const [checkMatch, setCheckMatch] = useState(false);

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
      } catch (err) {
        console.log(err);
      }
    };

    getCharactersImages();
  }, []);

  const handleClick = (name, index) => {
    const cardId = `${name}-${index}`;
    setClickedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  return (
    <div className="character-container">
      {Object.entries(images).flatMap(([name, imgSrc]) =>
        [...Array(2)].map((_, index) => {
          const cardId = `${name}-${index}`;
          return (
            <img
              key={cardId}
              src={clickedCards.includes(cardId) ? imgSrc : hogwartsImage}
              alt={name}
              className="characters-images"
              onClick={() => handleClick(name, index)}
            />
          );
        })
      )}
    </div>
  );
}

export { GetCharacters };
