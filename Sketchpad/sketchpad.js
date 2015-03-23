$(document).ready(function() {
	wrapper = $(".wrapper");
	gridWidth = wrapper.width();
	createGrid(12);
	square.on("mouseenter", normalColor);
});

var normal = $("#normal");
normal.on("click", function() {
	resetGrid();
	square.on("mouseenter", normalColor);
});

var random = $("#random");
random.on("click", function() {
	resetGrid();
	square.on("mouseenter", function() {
		$(this).css("background-color", randomColor());
	}); 
}); 

var tracer = $("#tracer");
tracer.on("click", function() {
	resetGrid();
	square.on("mouseenter", boxTracer);
});

function resetGrid() {
	var newSize = prompt("Enter a number between 2 and 128");
		if (newSize >= 2 && newSize <= 128) {
			// force grid size to be a factor of .wrapper width
			while (gridWidth % newSize !== 0)
				newSize--;
			createGrid(newSize);
		}
		else {
			alert("You did not enter a valid number\n\nUsing default 12x12");
			createGrid(12);
		}
}

function createGrid(n) {
	var newDiv = "<div class='box'></div>";
	var newRow = "<div class='row'></div>";
	var gridSize = n;
	// boxsize needs to account for 1px border -> 2n/n = 2
	var boxSize = (gridWidth / n) - 2;
	$(".box, .row").remove();
	while (n > 0) {
		for (var i = 0; i <= gridSize; i++) {
			if (i < gridSize) 
				wrapper.append(newDiv);
			else
				wrapper.append(newRow);	
		}	
		n--;		
 	}
	// Cache selectors and set CSS properties
  square = $(".box");
	square.css({
		width: boxSize,
		height: boxSize
	}); 
}

function normalColor() {
	$(this).toggleClass("highlight");
}

function randomColor(){
	var rColor = "rgb(" +
			(Math.floor(Math.random()*256)) + "," +
			(Math.floor(Math.random()*256)) + "," +
			(Math.floor(Math.random()*256)) + ")";
	return rColor;
}

function boxTracer() {
	var $this = $(this);
	$this.fadeTo("slow", 0);
	$this.mouseleave(function() {
		$this.fadeTo("fast", 1);
	});
}







