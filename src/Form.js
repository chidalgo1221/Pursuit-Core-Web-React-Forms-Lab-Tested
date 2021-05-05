import React from "react";

export class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      array: "",
      value: "",
      answer: "",
    };
    this.answer = "";
    this.newArray = [];
  }

  handleArray = (e) => {
    this.setState({ array: e.target.value });
  };

  handleValue = (e) => {
    this.setState({ value: e.target.value });
  };

  handleChecker = () => {
    this.newArray = this.state.array.split(",").map((el) => Number(el));
    return this.newArray.every((character) => {
      return !Number.isNaN(character);
    });
  };

  handleSum = () => {
    let total = 0;
    this.newArray.forEach((elem) => (total += elem));
    this.setState({ answer: total });
    return total;
  };

  handleAverage = () => {
    let average = this.handleSum();
    this.setState({ answer: average / this.newArray.length });
  };

  handleForMode = () => {
    const object = {};
    let num = 0;
    let highestKey = -0;

    this.newArray.forEach((numb) => {
      object[numb] = (object[numb] || 0) + 1;
    });

    for (let key in object) {
      const value = object[key];
      if (value > num) {
        num = value;
        highestKey = key;
      }
    }
    this.setState({ answer: highestKey });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.value === "sum" && this.handleChecker()) {
      this.handleSum();
    } else if (this.state.value === "average" && this.handleChecker()) {
      this.handleAverage();
    } else if (this.state.value === "mode" && this.handleChecker()) {
      this.handleForMode();
    } else {
      this.setState({ answer: "Invalid input." });
    }
  };

  render() {
    const { array, value } = this.state;
    return (
      <div>
        <h1>Enter each number in the array, separated by a ","</h1>
        <form className="Calculator" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="array"
            id="array"
            value={array}
            onChange={this.handleArray} />
          <select onChange={this.handleValue} value={value}>
            <option value=""></option>
            <option value="sum">sum</option>
            <option value="average">average</option>
            <option value="mode">mode</option>
          </select>
          <button type="submit">Calculate</button>
        </form>
        <p>{this.state.answer}</p>
      </div>
    );
  }
}
export default Form;