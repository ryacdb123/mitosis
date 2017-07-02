
var cells = [];
var noCells = 100;
function setup(){
	createCanvas(750, 750);

	for(var j = 0; j < noCells; j++){
		cells.push(new Cell());
	}
}

function draw(){
	background(51);
	
	for(var i = 0; i < cells.length; i++){
		cells[i].move();
		cells[i].show();
	}

}

function mousePressed(){
	for(var i = cells.length -1; i >= 0; i--){
		if(cells[i].clicked(mouseX, mouseY)){
			var newCellA = cells[i].mitosis();
			var newCellB = cells[i].mitosis();
			cells.push(newCellA);
			cells.push(newCellB);
			cells.splice(i, 1);

		}
	}
}

function Cell(pos, r, c){

	if(pos){
		this.pos = pos.copy();
	}
	else {
		this.pos = createVector(random(150, width - 150), random(150, height -150));
	}

	//this.pos = pos.copy() || createVector(random(150, width - 150), random(150, height -150));
	this.r = r || 80;
	this.c = c || color(random(100, 255), 0, random(100, 255), 100);

	this.mitosis = function(){
		var cellA = new Cell(this.pos, this.r/2, this.c);
		return cellA;
	}

	this.clicked = function(x, y){
		var d = dist(this.pos.x, this.pos.y, x, y);
		if (d < this.r) {
			return true;
		}
		else {
			return false;
		}
	}

	this.move = function(){
		var velocity = p5.Vector.random2D();
		var vel = velocity;
		this.pos.add(vel);
	}

	this.show = function(){
		noStroke();
		fill(this.c, 100);
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
	}
}