import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Hello XYZ Stocks</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));