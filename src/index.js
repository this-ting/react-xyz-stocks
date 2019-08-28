import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Router, Link } from "react-router-dom";


class App extends Component {
  state = {
    name: 'ting'
  }
  
  render() {
    return (
      <div className='container'>
        <h1>This is XYZ Stocks. Hello {this.state.name}</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));