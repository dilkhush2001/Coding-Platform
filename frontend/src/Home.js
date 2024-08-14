import React from "react";
import i1 from "./images/i1.jpg";
import i2 from "./images/i2.jpg";
import i3 from "./images/i3.jpg";
import i4 from "./images/i4.jpg";
import i5 from "./images/i5.jpg";

function Home() {
  const images = [i1, i2, i3, i4, i5];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "78vh",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "gray",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={images[currentIndex]}
          alt="Slideshow"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default Home;
