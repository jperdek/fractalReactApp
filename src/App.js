import React from 'react';
import logo from './logo.svg';
import './App.css';

class Wcurve {
	constructor(size, lineLength, thickness, distanceWidthRadius){
		this.thickness = thickness;
		this.size = size;
		this.lineLength = null;
		this.diagonalLength = null;
		this.moveRatio = null;
		this.distanceWidthRadius = distanceWidthRadius;
		
		this.direction = {
			LEFT_UP: 0,
			LEFT_DOWN: 1,
			RIGHT_UP: 2,
			RIGHT_DOWN: 3,
			ALL: 4
		};
	}
	
	initialize(iterations) {
		this.lineLength = this.size;
		for(var i=0; i<iterations; i++){
			this.lineLength = Math.round(this.lineLength / 2.0);
		}

		this.diagonalLength = this.lineLength;//Math.round(this.lineLength * Math.sqrt(2.0));
		this.lineLengthHalf = this.lineLength / 2;//Math.round(this.diagonalLength / 2.0);
		this.moveRatio = 1 << iterations;
	}
}

class Fractal extends React.Component {
	Circle(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	drawLine(context, x1, y1, x2, y2, thickness) {
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.lineWidth = thickness;
		context.strokeStyle = "#cfc";
		context.stroke();
	}


	drawCircle(context, x, y, radius) {
		context.fillStyle = "rgba(200, 200, 100, .9)";
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
	}


	drawWCurve(iteration, moveRatioIteration, centerX, centerY, wcurve, context, direction, inheritedOperation){
		var square1x, square1y, square2x, square2y, square3x, square3y, square4x, square4y;
		var verticalToSquare1y, horizontalToSquare1x;
		var verticalToSquare2y, horizontalToSquare2x;
		var verticalToSquare3y, horizontalToSquare3x;
		var verticalToSquare4y, horizontalToSquare4x;
		
		var newLeftUpX, newLeftUpY, newRightUpX, newRightUpY;
		var newLeftBottomX, newLeftBottomY, newRightBottomX, newRightBottomY;
		var distanceOfNewOnes = moveRatioIteration * wcurve.lineLength;
		
		var condOfDirRightUp, condOfDirRightDown, condOfDirLeftDown, condOfDirLeftUp;
		
		if(iteration > 0){
			square1x = centerX - wcurve.lineLengthHalf;
			square1y = centerY - wcurve.lineLengthHalf;
			
			square2x = centerX + wcurve.lineLengthHalf;
			square2y = centerY - wcurve.lineLengthHalf;
			
			square3x = centerX - wcurve.lineLengthHalf;
			square3y = centerY + wcurve.lineLengthHalf;
			
			square4x = centerX + wcurve.lineLengthHalf;
			square4y = centerY + wcurve.lineLengthHalf;
			
			
			verticalToSquare1y = square1y - wcurve.lineLength;
			horizontalToSquare1x = square1x - wcurve.lineLength;
			
			verticalToSquare2y = square2y - wcurve.lineLength;
			horizontalToSquare2x = square2x + wcurve.lineLength;
			
			verticalToSquare3y = square3y + wcurve.lineLength;
			horizontalToSquare3x = square3x - wcurve.lineLength;
			
			verticalToSquare4y = square4y + wcurve.lineLength;
			horizontalToSquare4x = square4x + wcurve.lineLength;
			
			
			newLeftUpX = centerX - distanceOfNewOnes;
			newLeftUpY = centerY - distanceOfNewOnes;
			
			newRightUpX = centerX + distanceOfNewOnes;
			newRightUpY = centerY - distanceOfNewOnes;
			
			newLeftBottomX = centerX - distanceOfNewOnes;
			newLeftBottomY = centerY + distanceOfNewOnes;
			
			newRightBottomX = centerX + distanceOfNewOnes;
			newRightBottomY = centerY + distanceOfNewOnes;
			
			
			if(direction === wcurve.direction.LEFT_DOWN){
				condOfDirRightUp = true;
			} else if(direction !== wcurve.direction.RIGHT_UP){
				condOfDirRightUp = false;
			} else{
				condOfDirRightUp = inheritedOperation;
			}
			
			if(direction === wcurve.direction.LEFT_UP){
				condOfDirRightDown = true;
			} else if(direction !== wcurve.direction.RIGHT_DOWN){
				condOfDirRightDown = false;
			} else{
				condOfDirRightDown = inheritedOperation;
			}
			
			if(direction === wcurve.direction.RIGHT_UP){
				condOfDirLeftDown = true;
			} else if(direction !== wcurve.direction.LEFT_DOWN){
				condOfDirLeftDown = false;
			} else{
				condOfDirLeftDown = inheritedOperation;
			}
			
			if(direction === wcurve.direction.RIGHT_DOWN){
				condOfDirLeftUp = true;
			} else if(direction !== wcurve.direction.LEFT_UP){
				condOfDirLeftUp = false;
			} else{
				condOfDirLeftUp = inheritedOperation;
			}
			
			if(iteration === 1){
				if(direction !== wcurve.direction.RIGHT_DOWN && (direction !== wcurve.direction.LEFT_UP || condOfDirLeftUp === false)){
					this.drawLine(context, square1x - wcurve.distanceWidthRadius, square1y - wcurve.distanceWidthRadius, square1x - wcurve.distanceWidthRadius, verticalToSquare1y - wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square1x + wcurve.distanceWidthRadius, square1y + wcurve.distanceWidthRadius, square1x + wcurve.distanceWidthRadius, verticalToSquare1y + wcurve.distanceWidthRadius, wcurve.thickness);
							
							
					this.drawLine(context, square1x - wcurve.distanceWidthRadius, square1y - wcurve.distanceWidthRadius, horizontalToSquare1x - wcurve.distanceWidthRadius, square1y - wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square1x + wcurve.distanceWidthRadius, square1y + wcurve.distanceWidthRadius, horizontalToSquare1x + wcurve.distanceWidthRadius, square1y + wcurve.distanceWidthRadius, wcurve.thickness);
					
					
				}
				
				if(direction === wcurve.direction.LEFT_UP) {
					this.drawLine(context, square3x + wcurve.distanceWidthRadius, verticalToSquare3y - wcurve.distanceWidthRadius, square4x + wcurve.distanceWidthRadius, verticalToSquare4y - wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square3x - wcurve.distanceWidthRadius, verticalToSquare3y + wcurve.distanceWidthRadius, square4x - wcurve.distanceWidthRadius, verticalToSquare4y + wcurve.distanceWidthRadius, wcurve.thickness);
					
					this.drawLine(context, horizontalToSquare2x - wcurve.distanceWidthRadius, square2y + wcurve.distanceWidthRadius, horizontalToSquare4x - wcurve.distanceWidthRadius, square4y + wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, horizontalToSquare2x + wcurve.distanceWidthRadius, square2y - wcurve.distanceWidthRadius, horizontalToSquare4x + wcurve.distanceWidthRadius, square4y - wcurve.distanceWidthRadius, wcurve.thickness);
				}
				
				if(direction !== wcurve.direction.LEFT_DOWN && (direction !== wcurve.direction.RIGHT_UP || condOfDirRightUp ===false)){
					this.drawLine(context, square2x + wcurve.distanceWidthRadius, square2y - wcurve.distanceWidthRadius, square2x + wcurve.distanceWidthRadius, verticalToSquare2y - wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square2x - wcurve.distanceWidthRadius, square2y + wcurve.distanceWidthRadius, square2x - wcurve.distanceWidthRadius, verticalToSquare2y + wcurve.distanceWidthRadius, wcurve.thickness);
					
					
					this.drawLine(context, square2x + wcurve.distanceWidthRadius, square2y - wcurve.distanceWidthRadius, horizontalToSquare2x + wcurve.distanceWidthRadius, square2y - wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square2x - wcurve.distanceWidthRadius, square2y + wcurve.distanceWidthRadius, horizontalToSquare2x - wcurve.distanceWidthRadius, square2y + wcurve.distanceWidthRadius, wcurve.thickness);
				}
				
				if(direction !== wcurve.direction.RIGHT_UP && (direction !== wcurve.direction.LEFT_DOWN || condOfDirLeftDown === false)){
					this.drawLine(context, square3x - wcurve.distanceWidthRadius, square3y + wcurve.distanceWidthRadius, square3x - wcurve.distanceWidthRadius, verticalToSquare3y + wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square3x + wcurve.distanceWidthRadius, square3y - wcurve.distanceWidthRadius, square3x + wcurve.distanceWidthRadius, verticalToSquare3y - wcurve.distanceWidthRadius, wcurve.thickness);
					
					
					this.drawLine(context, square3x + wcurve.distanceWidthRadius, square3y - wcurve.distanceWidthRadius, horizontalToSquare3x + wcurve.distanceWidthRadius, square3y - wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square3x - wcurve.distanceWidthRadius, square3y + wcurve.distanceWidthRadius, horizontalToSquare3x - wcurve.distanceWidthRadius, square3y + wcurve.distanceWidthRadius, wcurve.thickness);
					
				}  
				
				
				if(direction !== wcurve.direction.LEFT_UP && (direction !== wcurve.direction.RIGHT_DOWN || condOfDirRightDown === false)){
					this.drawLine(context, square4x + wcurve.distanceWidthRadius, square4y + wcurve.distanceWidthRadius, square4x + wcurve.distanceWidthRadius, verticalToSquare4y + wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square4x - wcurve.distanceWidthRadius, square4y - wcurve.distanceWidthRadius, square4x - wcurve.distanceWidthRadius, verticalToSquare4y - wcurve.distanceWidthRadius, wcurve.thickness);
					
					
					this.drawLine(context, square4x - wcurve.distanceWidthRadius, square4y - wcurve.distanceWidthRadius, horizontalToSquare4x - wcurve.distanceWidthRadius, square4y - wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square4x + wcurve.distanceWidthRadius, square4y + wcurve.distanceWidthRadius, horizontalToSquare4x + wcurve.distanceWidthRadius, square4y + wcurve.distanceWidthRadius, wcurve.thickness);
		
				} 
				if(direction === wcurve.direction.RIGHT_DOWN) {
					this.drawLine(context, square1x - wcurve.distanceWidthRadius, verticalToSquare1y + wcurve.distanceWidthRadius, square2x - wcurve.distanceWidthRadius, verticalToSquare2y + wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, square1x + wcurve.distanceWidthRadius, verticalToSquare1y - wcurve.distanceWidthRadius, square2x + wcurve.distanceWidthRadius, verticalToSquare2y - wcurve.distanceWidthRadius, wcurve.thickness);
					
					this.drawLine(context, horizontalToSquare1x + wcurve.distanceWidthRadius, square1y - wcurve.distanceWidthRadius, horizontalToSquare3x + wcurve.distanceWidthRadius, square3y - wcurve.distanceWidthRadius, wcurve.thickness);
					this.drawLine(context, horizontalToSquare1x - wcurve.distanceWidthRadius, square1y + wcurve.distanceWidthRadius, horizontalToSquare3x - wcurve.distanceWidthRadius, square3y + wcurve.distanceWidthRadius, wcurve.thickness);	
				} 
				
			} else {
				 
				
				this.drawLine(context, square1x - wcurve.distanceWidthRadius, verticalToSquare1y + wcurve.distanceWidthRadius, square2x + wcurve.distanceWidthRadius, verticalToSquare2y + wcurve.distanceWidthRadius, wcurve.thickness);
				this.drawLine(context, square1x + wcurve.distanceWidthRadius, verticalToSquare1y - wcurve.distanceWidthRadius, square2x - wcurve.distanceWidthRadius, verticalToSquare2y - wcurve.distanceWidthRadius, wcurve.thickness);
			
			
				this.drawLine(context, square3x - wcurve.distanceWidthRadius, verticalToSquare3y - wcurve.distanceWidthRadius, square4x + wcurve.distanceWidthRadius, verticalToSquare4y - wcurve.distanceWidthRadius, wcurve.thickness);
				this.drawLine(context, square3x + wcurve.distanceWidthRadius, verticalToSquare3y + wcurve.distanceWidthRadius, square4x - wcurve.distanceWidthRadius, verticalToSquare4y + wcurve.distanceWidthRadius, wcurve.thickness);
		
		
				this.drawLine(context, horizontalToSquare1x + wcurve.distanceWidthRadius, square1y - wcurve.distanceWidthRadius, horizontalToSquare3x + wcurve.distanceWidthRadius, square3y + wcurve.distanceWidthRadius, wcurve.thickness);
				this.drawLine(context, horizontalToSquare1x - wcurve.distanceWidthRadius, square1y + wcurve.distanceWidthRadius, horizontalToSquare3x - wcurve.distanceWidthRadius, square3y - wcurve.distanceWidthRadius, wcurve.thickness);
			
			
				this.drawLine(context, horizontalToSquare2x - wcurve.distanceWidthRadius, square2y - wcurve.distanceWidthRadius, horizontalToSquare4x - wcurve.distanceWidthRadius, square4y + wcurve.distanceWidthRadius, wcurve.thickness);
				this.drawLine(context, horizontalToSquare2x + wcurve.distanceWidthRadius, square2y + wcurve.distanceWidthRadius, horizontalToSquare4x + wcurve.distanceWidthRadius, square4y - wcurve.distanceWidthRadius, wcurve.thickness);
			}
			
			//this.drawLine(context, square1x, verticalToSquare1y, square2x, verticalToSquare2y, wcurve.thickness);
			//this.drawLine(context, square3x, verticalToSquare3y, square4x, verticalToSquare4y, wcurve.thickness);
			//this.drawLine(context, horizontalToSquare1x, square1y, horizontalToSquare3x, square3y, wcurve.thickness);
			//this.drawLine(context, horizontalToSquare2x, square2y, horizontalToSquare4x, square4y, wcurve.thickness);
			
			this.drawWCurve(iteration - 1, moveRatioIteration / 2.0, newLeftUpX, newLeftUpY, wcurve, context, wcurve.direction.LEFT_UP, condOfDirLeftUp);
			this.drawWCurve(iteration - 1, moveRatioIteration / 2.0, newRightUpX, newRightUpY, wcurve, context, wcurve.direction.RIGHT_UP, condOfDirRightUp);
			this.drawWCurve(iteration - 1, moveRatioIteration / 2.0, newLeftBottomX, newLeftBottomY, wcurve, context, wcurve.direction.LEFT_DOWN,  condOfDirLeftDown);
			this.drawWCurve(iteration - 1, moveRatioIteration / 2.0, newRightBottomX, newRightBottomY, wcurve, context, wcurve.direction.RIGHT_DOWN,condOfDirRightDown);	
		}
	}

	componentDidMount(){
		var canvas = document.getElementById("game");
		var context = canvas.getContext('2d');
		var numberIterations = 3;
		var lineLength = 10;
		var thickness = 1;
		var distanceWidthRadius = 2;
		var wcurve = new Wcurve(canvas.width/4, lineLength, thickness, distanceWidthRadius);
	
		wcurve.initialize(numberIterations);
		this.drawWCurve(numberIterations, wcurve.moveRatio / 2, canvas.width/2.0, canvas.width/2.0, wcurve, context, wcurve.direction.ALL, false, false, false, false);
	}
	
	render() {
		return (
			<canvas id="game" width="1200" height="1200">
				Vas prehliadac nepodporuje platno.
			</canvas>);
	}
}

function App() {
	
	  return (
		<div className="App">
		  <header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
			  Fractals
			</p>
			<a
			  className="App-link"
			  href="https://reactjs.org"
			  target="_blank"
			  rel="noopener noreferrer"
			>
			  Modified w-curve!!!
			</a>
		  </header>
		  <Fractal>
		  </Fractal>
		</div>
	  );
}

export default App;
