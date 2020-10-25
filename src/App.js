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
    let w, h;
    while (true) {
      w = prompt("Enter Width:");
      if (!Number.isNaN(w) && parseInt(w) > 3) {
        break;
      }
    }

    while (true) {
      h = prompt("Enter Height:");
      if (!Number.isNaN(h) && parseInt(h) > 3) {
        break;
      }
    }

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
      marioPosition: [
        Math.floor(this.state.height / 2),
        Math.floor(this.state.width / 2),
      ],
    });
  }

  componentDidMount() {
    ArrowKeysReact.config({
      left: () => {
        if (this.state.marioPosition[1] !== 0) {
          this.checkWhetherToEjectSprite([
            this.state.marioPosition[0],
            this.state.marioPosition[1] - 1,
          ]);
        }
      },
      right: () => {
        if (this.state.marioPosition[1] !== this.state.width - 1) {
          this.checkWhetherToEjectSprite([
            this.state.marioPosition[0],
            this.state.marioPosition[1] + 1,
          ]);
        }
      },
      up: () => {
        if (this.state.marioPosition[0] !== 0) {
          this.checkWhetherToEjectSprite([
            this.state.marioPosition[0] - 1,
            this.state.marioPosition[1],
          ]);
        }
      },
      down: () => {
        if (this.state.marioPosition[0] !== this.state.height - 1) {
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
        tempSprite.splice(i, 1);
        this.setState({
          spritePosition: tempSprite,
        });
        if (this.state.spritePosition.length === 0)
          alert(`Your score is: ${this.state.count}`);
      }

      this.setState({
        count: this.state.count + 1,
      });
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
