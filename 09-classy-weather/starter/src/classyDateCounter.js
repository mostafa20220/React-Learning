
import React from 'react';

export default class App extends React.Component{

  state = {count:0}

  handleIncrement = () => {
    // this.setState({count:this.state.count+1});
    this.setState(state => ({count:state.count+1}));
  }

  handleDecrement = () => {
    this.setState(state=> ({count:state.count-1}));
  }

  render(){
    const date = new Date();
    date.setDate(date.getDate() + this.state.count);
    return(
      <div>
        <button onClick={this.handleDecrement}>-</button>
        
          <p> 
            [{this.state.count} days from now is]
            </p>
            <p>
            {date.toDateString()}
          </p>
      
        <button  onClick={this.handleIncrement}>+</button>
      </div>
    )
  }
}