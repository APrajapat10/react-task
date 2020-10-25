import React, { Component } from "react";
import "./App.css";
import Square from "./Components/square";

import ArrowKeysReact from "arrow-keys-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      count: 0,
    };
  }

  componentWillMount() {
    let w = prompt("Width");
    let h = prompt("height");
    console.log(w, h);

    this.setState({
      width: parseInt(w),
      height: parseInt(h),
      marioPosition: [0, 0],
      spritePosition: [],
    });
  }

  putSprites() {
    const numberOfSprites =
      this.state.height <= this.state.width
        ? this.state.height
        : this.state.width;
    let arr = [];
    for (let i = 0; i < numberOfSprites; i++) {
      let possibleSprite = [
        Math.floor(Math.random() * this.state.width),
        Math.floor(Math.random() * this.state.height),
      ];
      if (
        possibleSprite[0] === this.state.marioPosition[0] &&
        possibleSprite[1] === this.state.marioPosition[1]
      )
        continue;
      arr.push(possibleSprite);
    }
    this.setState({
      spritePosition: arr,
      marioPosition: [this.state.height / 2, this.state.width / 2],
    });
  }

  componentDidMount() {
    ArrowKeysReact.config({
      left: () => {
        console.log("left key detected.");
        if (this.state.marioPosition[1] !== 0) {
          this.checkWhetherToEjectSprite([
            this.state.marioPosition[0],
            this.state.marioPosition[1] - 1,
          ]);
        }
      },
      right: () => {
        console.log("right key detected.");
        if (this.state.marioPosition[1] !== this.state.width - 1) {
          this.checkWhetherToEjectSprite([
            this.state.marioPosition[0],
            this.state.marioPosition[1] + 1,
          ]);
        }
      },
      up: () => {
        console.log("up key detected.");
        if (this.state.marioPosition[0] !== 0) {
          this.checkWhetherToEjectSprite([
            this.state.marioPosition[0] - 1,
            this.state.marioPosition[1],
          ]);
        }
      },
      down: () => {
        console.log("down key detected.", [
          this.state.marioPosition[0] + 1,
          this.state.marioPosition[1],
        ]);
        if (this.state.marioPosition[0] !== this.state.height - 1) {
          console.log(this.state.marioPosition);
          this.checkWhetherToEjectSprite([
            this.state.marioPosition[0] + 1,
            this.state.marioPosition[1],
          ]);
        }
      },
    });
    this.putSprites();
    this.nameInput.focus();
  }

  checkWhetherToEjectSprite(newPosition) {
    this.setState({ marioPosition: newPosition });
    this.state.spritePosition.map((el, i) => {
      if (newPosition[0] === el[0] && newPosition[1] === el[1]) {
        let tempSprite = this.state.spritePosition;
        console.log(tempSprite);
        tempSprite.splice(i, 1);
        console.log(tempSprite);

        this.setState({
          spritePosition: tempSprite,
        });
        if (this.state.spritePosition.length === 0)
          alert(`Your score is: ${this.state.count}`);
      }

      this.setState({
        count: this.state.count + 1,
      });
      console.log(this.state.count);
    });
  }

  displayRow(width, rowCount) {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {[...Array(width)].map((e, i) => (
          <Square
            key={`${rowCount}${i}`}
            mario={
              rowCount === this.state.marioPosition[0] &&
              i === this.state.marioPosition[1]
                ? true
                : false
            }
            sprite={this.checkIfSpriteToBePrinted(rowCount, i) ? true : false}
          />
        ))}
      </div>
    );
  }

  checkIfSpriteToBePrinted(row, col) {
    for (let i = 0; i < this.state.spritePosition.length; i++) {
      if (
        this.state.spritePosition[i][0] === row &&
        this.state.spritePosition[i][1] === col
      )
        return true;
    }
  }

  render() {
    return (
      <a
        {...ArrowKeysReact.events}
        tabIndex="1"
        ref={(input) => {
          this.nameInput = input;
        }}
      >
        {this.state.height !== 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[...Array(this.state.height)].map((e, index) => (
              <div>
                {
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {[...Array(this.state.width)].map((e, i) => (
                      <Square
                        key={`${index}${i}`}
                        mario={
                          index === this.state.marioPosition[0] &&
                          i === this.state.marioPosition[1]
                            ? true
                            : false
                        }
                        sprite={
                          this.checkIfSpriteToBePrinted(index, i) ? true : false
                        }
                      />
                    ))}
                  </div>
                }
              </div>
            ))}
          </div>
        )}
      </a>
    );
  }
}

export default App;
