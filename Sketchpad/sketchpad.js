"use strict";
$(document).ready(function() {
  sketch.startup();
});


var sketch = (function() { 

  var wrapper = $(".wrapper"), width = wrapper.width(), 
      square = null;
 
  function init() {
    populateDropDown("grid", 2, 32);
    createGrid(12);
    wrapper.on("mouseenter", ".box", normalColor);
  }

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
    $this.fadeTo("fast", 1);
  }

  function boxShader() {
    var $this = $(this), $opacity = $this.css("opacity");
    if ($opacity > 0.2)
      $this.css("opacity", $opacity - 0.2);
  }

  function populateDropDown(id, min, max) {
    var i, select, option;
    select = document.getElementById(id);
    for (i = min; i <= max; i += 1) {
      if (width % i === 0) {
        option = document.createElement("option");
        option.value = i;
        option.text = i + " x " + i;
        select.add(option);
      }
    }
  }

  function createGrid(size) {
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
  }

  function resetSquare() {
    wrapper.off();
    square.css({
      "background-color": "",
      opacity: 1
    });
  }

  return {

    startup: init,
    mouseHandler: wrapper,
    normal: normalColor,
    random: randomColor,
    tracer: boxTracer,
    shader: boxShader,
    gridDropDown: populateDropDown,
    build: createGrid,
    clear: resetSquare
  }; 
})();

$("#normal").on("click", function() {
  sketch.clear();
  sketch.mouseHandler.on("mouseenter", ".box", sketch.normal);
});

$("#random").on("click", function() {
  sketch.clear();
  sketch.mouseHandler.on("mouseenter", ".box", function() {
    $(this).css("background-color", sketch.random);
  }); 
}); 

$("#tracer").on("click", function() {
  sketch.clear();
  sketch.mouseHandler.on("mouseenter", ".box", sketch.tracer);
});

$("#shader").on("click", function() {
  sketch.clear();
  sketch.mouseHandler.on("mouseenter", ".box", sketch.shader);
});
