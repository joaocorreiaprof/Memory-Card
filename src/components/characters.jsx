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

  return (
    <div className="character-container">
      {Object.entries(images).map(([name, imgSrc]) => (
        <img key={name} src={imgSrc} alt={name} className="characters-images" />
      ))}
    </div>
  );
}

export { GetCharacters };
