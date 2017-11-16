# React

React Fundamentals
------------------
Few tutorials about Java script(https://jscomplete.com/learn-javascript).
React is javascript library not a framework like angular. You often need more libraries to work with react to give a complete solution.

React builds user interfaces very well. React with its DOM libraries will built the UI. Without react or similar libraries we need to manually built the UI with native web apis in javascript.

React is declarative. i.e. we describe UI's with react what we want not how to do it. React will take care of how and translate our declarative declarations into actual UI in the browser.

React is compared with view in MVC.

React has 3 main desgin concepts.
1)Components --> we describe UI using components. Components are like functions in js. These are reusable. Components can contain other components.

Note: unlike functions, react component can have private state that hold data that may change over time.

2)Reactive updates --> when the state of a component(the input) changes the UI it represents (the o/p)changes as well.

Note: React will take the state changes and automatically updates the browser.

3)virtual views in memory --> with react we write html using javascript. react depends on the power of javascript that generates some data rather than enhancing HTML to work with that data.

Note: Frameworks like angular enhance HTML with features like loops, conditions etc.

Note: Both enhancing HTML and generating HTML with javascript has advantages and disadvantages. React uses later because advantages are stronger than disadvantages.

Note: React keeps virtual representation of DOM in memory which is known as virtual DOM. React uses this concept to render an HTML tree virutally first and then everytime state changes we have a new HTML tree that is written back to the browsers DOM. Instead of writing the whole tree , react will only write the difference between the new tree and the old tree, because it has both trees in memory. This process is called as "Tree reconciliation".

React components
----------------
React components are two types. They are
1)Function Component.
2)Class Component.

Function Component:
-------------------
This is the simplest form of a react component. It receives an object of type property(called as props) and it returns something that looks like an html, but it is actually a javascript syntax called as JSX.

	const MyComponent = (props) => {
		return(
			<elementOrComponent ../>
		);
	}
	ReactDOM.render(<MyComponent />, mountNode); //where mountNode is the DOM element of your HTML
	
	Ex: const Button=function(){
			return (
				<button>GO</button>

			);
		}
		ReactDOM.render(<Button/>,mountNode);	

Note: Instead of hardcoding the button label, we can pass lable using properties object.
Note: To practice react examples online directly (https://jscomplete.com/repl). 	

Class Component
---------------
Class Component is a more featured way of defining a react component. It acts as a function that receives a private internal state along with props. This private internal state gives react its reactiveness. When the state of a class component changes react will automatically re-render that component.

Note: state and properties have one difference. while the state can be changed, properties cannot be changed. Here is a simple example without any state and properties.

	class Hello extends React.component{
		render(){
			return(
				<div className="container">
					<h1>Getting Started</h1>
				</div>
			);
		}
	}
	ReactDOM.render(<Hello />, mountNode); 
	
Note: The above component written is a speical syntax called JSX which is very similar to DOM syntax we are used to. It is optional. React component can be written without JSX. It can be written in pure javascript syntax like below.

	class Hello extends React.component{
		render(){
			return(
				React.createElement("div",
				{className:"container"},
				React.createElement("h1","null","Getting Started")
				)
			);
		}
	}
	ReactDOM.render(React.createElement(Hello,null), mountNode);

Note: React internally converts JSX into javascript syntax.

Dynamically rendering DOM object label etc also possible using properties like this.

	const Button=function(props){
		return (
			<button>{props.label}</button>
		);
	}
	ReactDOM.render(<Button label="DO"/>,mountNode);

Note:props is an object that holds all values that were passed when rendering a component.

To implement the above using Classes,

	class Button extends React.Component{
		render(){
			return(
				<button>{this.props.label}</button>
			);
	    }
	}
	ReactDOM.render(<Button label="DO"/>,mountNode);
	
Note:Instead of props object we can use state object also to represent the above. For ex,

	class Button extends React.Component{
		state = {counter:0};
		render(){
			return(
				<button>{this.state.counter}</button>
			);
	    }
	}
	ReactDOM.render(<Button />,mountNode);
	
If we need event handler on button, then we need to define DOM event handler like this:

	<button onClick={handleClick}>{this.state.counter}</button>
	
Note: Unlike DOM event handler which uses a string, React uses curly braces like above. handleClick represents a global function or you can use inline function like this.
	
	<button onClick={() => doSomeThing()}>{this.state.counter}</button>

Ex: Lets increment the counter by 1 using the below example.
	
	class Button extends React.Component{
		state = { label:0};
		incrementCounter = () => {
			this.setState({
			label:this.state.label+1
		  })
		};
		render(){
			return(
				<button onClick={this.incrementCounter}>{this.state.label}</button>
			);
		}
	}

Note: setState() method is available with every class component instance to update.
*****
Note: Since we are using setState method to read the value and update its value, there can be race condition. To eliminate this, we can use prevState object provided by react to update the state value without any race condition issues.

	incrementCounter = () => 
	{
		this.setState((prevState)=> ({counter:prevState.counter+1}))
    	};

Example:
--------
Instead of changing the button values, lets create another component which will change upon click of the button.
	
	class Button extends React.Component{
		render(){
			return(
				<button onClick={this.props.increment}>+1</button>
			);
	    }
	}
  
    //function component  
	const Result=(props) => {
		return(
			<div>{props.counter}</div>
		)
	}
  
	  class App extends React.Component{
	    state = { counter:0};
	    incrementCounter = () => {
		this.setState((prevState)=> ({
		counter:prevState.counter+1
	      }))
	    };
	    render(){
			return(
			<div>
		  <Button increment={this.incrementCounter}/>
		  <Result counter={this.state.counter}/>
		</div>
	      )
	    }
	  }
	ReactDOM.render(<App />,mountNode);

Note: Using react we can render two components. To render two different components we need to create another class(App) like above.
Note: If an event on one component has to take effect on another, then the state and event handling method has to be defined in the parent component(App) like above.

Note: We know components are reusable. To reuse the above components for multiple increment values, we need to modify the Button component and define those in App component like this.

	//button component will pass the increment value as argument
	<button onClick={() => this.props.increment(this.props.incrementValue)}>+{this.props.incrementValue}</button>
	
	//App component incrementCounter method takes value as an argument
	incrementCounter = (incrementValue) => 
	{
    		this.setState((prevState)=> ({counter:prevState.counter+ incrementValue}))
    	};
	<Button incrementValue={1} increment={this.incrementCounter}/>
	<Button incrementValue={5} increment={this.incrementCounter}/>
	<Button incrementValue={10} increment={this.incrementCounter}/>
	<Button incrementValue={20} increment={this.incrementCounter}/>

Note: The button component can be written in much cleaner way like this.
	
	handleClick = () => {
    		this.props.increment(this.props.incrementValue)
        }
   
	render(){
		return(
			<button onClick={this.handleClick}>+{this.props.incrementValue}</button>
		);
	}

Note: Get Familiar with React Dev tools and play around with some react websites like netflix

Working with Data
-----------------
Instead of hardcoding values, we can work with an example to display git users with image,name and company name. Here is the code.
	
	const Card = (props) => {
		return(
		<div style={{margin: '1em'}}>
			<img width="75" src="https://avatars.githubusercontent.com/u/8445?v=3"/>
		  <div style={{display: 'inline-block',marginLeft:10}}>
			<div style={{fontSize: '1.25em',fontWeight:'bold'}}>
				Paul O'shannessy
			</div>
			<div>
				Facebook
			</div>
		  </div>
		</div>
	  );
	}
	ReactDOM.render(<Card/>,mountNode);

Note: Instead of hardcoding the values, we can pass an array like this.
	
	const Card = (props) => {
		return(
		<div style={{margin: '1em'}}>
			<img width="75" src={props.avatar_url}/>
		  <div style={{display: 'inline-block',marginLeft:10}}>
			<div style={{fontSize: '1.25em',fontWeight:'bold'}}>
				{props.name}
			</div>
			<div>
				{props.company}
			</div>
		  </div>
		</div>
	  );
	}

	let data=[
		{name:"Paul O'shannessy",
	   avatar_url:"https://avatars.githubusercontent.com/u/8445?v=3",
	   company:"Facebook"},
	   {name:"Ben Alpert",
	   avatar_url:"https://avatars.githubusercontent.com/u/6820?v=3",
	   company:"Facebook"}];
	   
	const CardList = (props) => {
		return(
		<div>
			{props.cards.map(card => <Card {...card}/>)}
		</div>
	  );
	}

	ReactDOM.render(<CardList cards={data}/>,mountNode);

Note: The syntax {...card} populate all the properties of card object. The operator ... is called as spread operator. Basically, it spreads the card object with the values.



	
