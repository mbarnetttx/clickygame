import React, { Component } from "react";
import Card from "./components/card";
import Wrapper from "./components/wrapper";
import Score from "./components/score";
import flowers from "./flowers.json";

class App extends Component {
  // Setting this.state.flowers to the cards json array
  state = {
    flowers,
    clickedCards: [],
    score: 0,
    goal: 8,
    status: ""
  };

  //shuffle the cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedCards = this.state.clickedCards

    if(clickedCards.includes(id)){
      this.setState({ clickedCards: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedCards.push(id)

      if(clickedCards.length === 8){
        this.setState({score: 10, status: "You Won! Click to play again!", clickedCards: []});
        console.log('You Win');
        return;
      }

      this.setState({ flowers, clickedCards, score: clickedCards.length, status: " " });

      for (let i = flowers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [flowers[i], flowers[j]] = [flowers[j], flowers[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Game</h1>
          <p className="App-intro">
            Don't click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={10}
               status={this.state.status}
               />
               
        <Wrapper>
          {this.state.flowers.map(flower => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={flower.id}
              key={flower.id}
              image={flower.image}
            />
          ))}
          
        </Wrapper>
        
    </div>
    );
  }
}

export default App;
        


