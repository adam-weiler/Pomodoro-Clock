import React from 'react';

const LengthComponent = ({ clicker, thisLength }) => {
	return (
	<div id="break-label">Break Length
	    <br/>
	    <div className="allButtons">
		    <button id="break-decrement"
		    onClick={
		    	clicker.bind(this, 'break_length', 'decrement')
		    }>â¼</button>
		    <div id="break-length">
		      	{thisLength} 
		    </div>
		    <button id = "break-increment" 
		    onClick = {
		        clicker.bind(this, 'break_length', 'increment')
		    }>â²</button>
		</div>
	</div>
	);
}

export default LengthComponent;