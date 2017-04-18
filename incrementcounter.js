/*Execute this in https://jscomplete.com/repl*/
class Button extends React.Component{
		render(){
			return(
					<button onClick={() => this.props.increment(this.props.incrementValue)}>+{this.props.incrementValue}</button>
        );
	    }
}

const Result = (props) => {
	return(
  	<div>{props.counter}</div>
  );
};

class App extends React.Component{
	state  = {counter:0};
  incrementCounter = (incrementValue) => {
    	this.setState((prevState)=> ({
      	counter:prevState.counter+ incrementValue
      }))
    };
  
  render(){
  return(
  	<div>
    	<Button incrementValue={1} increment={this.incrementCounter}/>
      <Button incrementValue={5} increment={this.incrementCounter}/>
      <Button incrementValue={10} increment={this.incrementCounter}/>
      <Button incrementValue={100} increment={this.incrementCounter} />
      <Result counter= {this.state.counter} />
      </div>
  );
  }
}

ReactDOM.render(<App />,mountNode);
