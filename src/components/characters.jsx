import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/characters.css";
import hogwartsImage from "../assets/images/hogwarts.jpg";

function GetCharacters() {
  const [images, setImages] = useState({});
  const [clickedCharacter, setClickedCharacter] = useState(null);

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

  const handleClick = (name) => {
    setClickedCharacter((prev) => (prev === name ? null : name));
  };

  return (
    <div className="character-container">
      {Object.entries(images).flatMap(([name, imgSrc]) =>
        [...Array(2)].map((_, index) => (
          <img
            key={`${name}-${index}`}
            src={clickedCharacter === name ? imgSrc : hogwartsImage}
            alt={name}
            className="characters-images"
            onClick={() => handleClick(name)}
          />
        ))
      )}
    </div>
  );
}

export { GetCharacters };
