import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Square from "./Components/square";

import ArrowKeysReact from "arrow-keys-react";

function App() {
  const height = 10;
  const width = 10;

  const [marioPosition, setMarioPosition] = useState([width / 2, height / 2]);
  const [spritePosition, setSpritePosition] = useState([]);
  const [count, setCount] = useState(0);

  const mainRef = useRef(null);

  useEffect(() => {
    putSprites();
    mainRef.current.focus();
  }, [mainRef]);

  ArrowKeysReact.config({
    left: () => {
      console.log("left key detected.");
      if (marioPosition[1] !== 0) {
        checkWhetherToEjectSprite([marioPosition[0], marioPosition[1] - 1]);
      }
    },
    right: () => {
      console.log("right key detected.");
      if (marioPosition[1] !== width - 1) {
        checkWhetherToEjectSprite([marioPosition[0], marioPosition[1] + 1]);
      }
    },
    up: () => {
      console.log("up key detected.");
      if (marioPosition[0] !== 0) {
        checkWhetherToEjectSprite([marioPosition[0] - 1, marioPosition[1]]);
      }
    },
    down: () => {
      console.log("down key detected.", [
        marioPosition[0] + 1,
        marioPosition[1],
      ]);
      if (marioPosition[0] !== height - 1) {
        console.log(marioPosition);
        checkWhetherToEjectSprite([marioPosition[0] + 1, marioPosition[1]]);
      }
    },
  });

  function checkWhetherToEjectSprite(newPosition) {
    setMarioPosition(newPosition);
    spritePosition.map((el, i) => {
      if (newPosition[0] === el[0] && newPosition[1] === el[1]) {
        let tempSprite = spritePosition;
        console.log(tempSprite);
        tempSprite.splice(i, 1);
        console.log(tempSprite);
        setSpritePosition(tempSprite);
        if (spritePosition.length === 0) alert(`Your score is: ${count}`);
      }
      setCount(count + 1);
      console.log(count);
    });
  }

  function checkIfSpriteToBePrinted(row, col) {
    for (let i = 0; i < spritePosition.length; i++) {
      if (spritePosition[i][0] === row && spritePosition[i][1] === col)
        return true;
    }
  }
  function putSprites() {
    const numberOfSprites = height <= width ? height : width;
    let arr = [];
    for (let i = 0; i < numberOfSprites; i++) {
      let possibleSprite = [
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
      ];
      if (
        possibleSprite[0] === marioPosition[0] &&
        possibleSprite[1] === marioPosition[1]
      )
        continue;
      arr.push(possibleSprite);
    }
    setSpritePosition(arr);
  }

  function displayRow(width, rowCount) {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {[...Array(width)].map((e, i) => (
          <Square
            key={`${rowCount}${i}`}
            mario={
              rowCount === marioPosition[0] && i === marioPosition[1]
                ? true
                : false
            }
            sprite={checkIfSpriteToBePrinted(rowCount, i) ? true : false}
          />
        ))}
      </div>
    );
  }
  function displayColumn(height) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {[...Array(height)].map((e, i) => (
          <div>{displayRow(width, i)}</div>
        ))}
      </div>
    );
  }

  return (
    <div {...ArrowKeysReact.events} tabIndex="1" ref={mainRef}>
      {displayColumn(height)}
    </div>
  );
}

export default App;
