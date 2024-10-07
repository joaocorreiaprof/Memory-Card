import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/characters.css";

function GetCharacters() {
  const [images, setImages] = useState({});

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
    console.log(`Personagem clicado: ${name}`);
  };

  return (
    <div className="character-container">
      {Object.entries(images).flatMap(([name, imgSrc]) =>
        [...Array(3)].map((_, index) => (
          <img
            key={`${name}-${index}`}
            src={imgSrc}
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
