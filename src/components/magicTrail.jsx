import { useEffect, useState } from "react";

const MagicTrail = () => {
  const [trail, setTrail] = useState([]);

  const handleMouseMove = (e) => {
    const newTrail = {
      left: `${e.pageX}px`,
      top: `${e.pageY}px`,
      id: Date.now(),
    };

    setTrail((prevTrail) => [...prevTrail, newTrail]);

    setTimeout(() => {
      setTrail((prevTrail) =>
        prevTrail.filter((item) => item.id !== newTrail.id)
      );
    }, 4000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {trail.map((item) => (
        <div
          key={item.id}
          className="trail"
          style={{
            position: "absolute",
            left: item.left,
            top: item.top,
            opacity: 1,
            transition: "opacity 4s",
          }}
        ></div>
      ))}
    </>
  );
};

export default MagicTrail;
