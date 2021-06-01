/*
  Author: kaluba Mulela
  Email: davidjasonKaluba@gmail.com
  Date modified: june 1, 2021.
*/
import React from "react";
import Quotes from "./Quotes";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.getData((data=>{
      this.setState({
        quote: data[0].text,
        author: data[0].author,
        quotes: data
      })
    }));
  }

  async getData(callback) {
    try {
      const response = await axios.get('https://type.fit/api/quotes');
      console.log(response.data);
      callback(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  randomQuote() {
    const randomNumber = Math.floor(Math.random() * this.state.quotes.length);
    return this.state.quotes[randomNumber];

  }
  shuffleQuotes(array){
    return array.sort(()=>Math.random()-0.5)
  }

  handleClick = () => {
    const generateRandomQuote = this.randomQuote();
    this.setState({
      quote: generateRandomQuote.text,
      author: generateRandomQuote.author
    });
    this.shuffleQuotes(this.state.quotes)
  };

  randomColor() {
    const color = `rgb(
      ${Math.floor(Math.random() * 155)},
      ${Math.floor(Math.random() * 155)},
      ${Math.floor(Math.random() * 155)})`;
    return color;
  }

  render() {
    return (
      <div>
        <Quotes
          displayColor={this.randomColor}
          handleClick={this.handleClick}
          {...this.state}
        />
      </div>
    );
  }
}

export default App;
