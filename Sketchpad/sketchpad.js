var grid = {
	wrapper: $(".wrapper"),
	width: $(".wrapper").width(),
	square: null
};

$(document).ready(function() {
	popDropDown("grid",2,32);
	createGrid(12);
	grid.wrapper.on("mouseenter", ".box", normalColor);
});

$("#normal").on("click", function() {
	grid.wrapper.off();
	grid.square.css("background-color", "");
	grid.wrapper.on("mouseenter", ".box", normalColor);
});

$("#random").on("click", function() {
	grid.wrapper.off();
	grid.square.css("background-color", "");
	grid.wrapper.on("mouseenter", ".box", function() {
		$(this).css("background-color", randomColor());
	}); 
}); 

$("#tracer").on("click", function() {
	grid.wrapper.off();
	grid.square.css("background-color", "");
	grid.wrapper.on("mouseenter", ".box", boxTracer);
});

function popDropDown(id, min, max) {
	var i, select, option;
	select = document.getElementById(id);
	for (i = min; i <= max; i += 1) {
		if (grid.width % i  === 0) {
			option = document.createElement("option");
			option.value = i;
			option.text = i + " x " + i;
			select.add(option);	
		}
	}
}

function createGrid(size) {
	var newDiv = "<div class='box'></div>"
	var boxCount = size * size + 1;
	// boxsize needs to account for 1px border -> 2n/n = 2
	var boxSize = (grid.width / size) - 2;
	$(".box").remove();
	while (boxCount -= 1) grid.wrapper.append(newDiv);
	// Cache selectors and set properties
  grid.square = $(".box");
	grid.square.css({
		width: boxSize,
		height: boxSize
	}); 
}

function normalColor() {
	$(this).css("background-color", "#d3d2d8");
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





