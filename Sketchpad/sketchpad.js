"use strict";
$(document).ready(function() {
  sketch.popDropDown("grid", 2, 32);
  sketch.createGrid(12);
  sketch.mouseHandler.on("mouseenter", ".box", sketch.normal);
});

var sketch = (function() { 
  var wrapper = $(".wrapper"), width = wrapper.width(), 
      square = null;
 
  function normalColor() {
    $(this).css("background-color", "#d3d2d8");
  }

  function randomColor() {
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

  function boxShader() {
    var $opacity = $(this).css("opacity");
    if ($opacity > 0)
      $(this).css("opacity", $opacity - 0.2);
  }

  return {

    mouseHandler: wrapper,
    normal: normalColor,
    random: randomColor,
    tracer: boxTracer,
    shader: boxShader,

    popDropDown: function(id, min, max) {
    	var i, select, option;
    	select = document.getElementById(id);
    	for (i = min; i <= max; i += 1) {
    		if (width % i  === 0) {
					option = document.createElement("option");
					option.value = i;
					option.text = i + " x " + i;
					select.add(option);	
				}
			}
		},

    createGrid: function(size) {
      // boxsize needs to account for 1px border -> 2n/n = 2
      var boxSize = (width / size) - 2,
          boxCount = size * size + 1,
          newDiv = "<div class='box'></div>";
      $(".box").remove();
      while ((boxCount -= 1)) wrapper.append(newDiv);
      // Cache selectors and set properties
      square = $(".box");
      square.css({
        width: boxSize,
        height: boxSize
      }); 
    },

    resetSquare: function() {
      wrapper.off();
      square.css({
        "background-color": "",
        opacity: 1
      });
    }
  }; 
})();

$("#normal").on("click", function() {
  sketch.resetSquare();
  sketch.mouseHandler.on("mouseenter", ".box", sketch.normal);
});

$("#random").on("click", function() {
  sketch.resetSquare();
  sketch.mouseHandler.on("mouseenter", ".box", function() {
    $(this).css("background-color", sketch.random);
  }); 
}); 

$("#tracer").on("click", function() {
  sketch.resetSquare();
  sketch.mouseHandler.on("mouseenter", ".box", sketch.tracer);
});

$("#shader").on("click", function() {
  sketch.resetSquare();
  sketch.mouseHandler.on("mouseenter", ".box", sketch.shader);
});