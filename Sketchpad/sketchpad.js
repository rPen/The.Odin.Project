$(document).ready(function() {
	wrapper = $(".wrapper");
	gridWidth = wrapper.width();
	popDropDown("grid",2,32);
	createGrid(12);
	wrapper.on("mouseenter", ".box", normalColor);
});

var normal = $("#normal");
normal.on("click", function() {
	wrapper.off();
	square.css("background-color", "");
	wrapper.on("mouseenter", ".box", normalColor);
});

var random = $("#random");
random.on("click", function() {
	wrapper.off();
	square.css("background-color", "");
	wrapper.on("mouseenter", ".box", function() {
		$(this).css("background-color", randomColor());
	}); 
}); 

var tracer = $("#tracer");
tracer.on("click", function() {
	wrapper.off();
	square.css("background-color", "");
	wrapper.on("mouseenter", ".box", boxTracer);
});

function popDropDown(id, min, max) {
	var i, select, option;
	select = document.getElementById(id);
	for (i = min; i <= max; i += 1) {
		if (gridWidth % i  === 0) {
			option = document.createElement("option");
			option.value = i;
			option.text = i + " x " + i;
			select.add(option);	
		}
	}
}

function createGrid(size) {
	var newDiv = "<div class='box'></div>"
	console.log(newDiv);
	var boxCount = size * size +1;
	// boxsize needs to account for 1px border -> 2n/n = 2
	var boxSize = (gridWidth / size) - 2;
	$(".box").remove();
	while (boxCount -= 1) wrapper.append(newDiv);
	// Cache selectors and set properties
  square = $(".box");
	square.css({
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





