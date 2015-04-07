'use strict';
var sketch = (function () {

  var $wrapper = $('.wrapper'),
    width = $wrapper.width(),
    $square = null;

  function init() {
    populateDropDown('grid', 2, 32);
    createGrid(12);
    $wrapper.on('mouseenter', '.box', normalColor);
  }

  function populateDropDown(id, min, max) {
    var i, select, option;
    select = document.getElementById(id);
    for (i = min; i <= max; i += 1) {
      // grid dimensions must be a factor of 'width'
      if (width % i === 0) {
        option = document.createElement('option');
        option.value = i;
        option.text = i + ' x ' + i;
        select.add(option);
      }
    }
  }

  function createGrid(size) {
    // boxsize needs to account for 1px border -> 2n/n = 2
    var boxSize = (width / size) - 2,
      boxCount = size * size,
      newDiv = '<div class="box"></div>';
    $('.box').remove();
    while (boxCount > 0) {
      $wrapper.append(newDiv);
      boxCount -= 1;
    }
    // Cache selectors and set properties
    $square = $('.box');
    $square.css({
      width: boxSize,
      height: boxSize
    });
  }

  function normalColor() {
    $(this).css('background-color', '#d3d2d8');
  }

  function randomColor() {
    var i, setColor, boxRgb = [];
    for (i = 0; i < 3; i += 1) {
      boxRgb[i] = (Math.floor(Math.random() * 256));
    }

    setColor = 'rgb(' + boxRgb[0] + ',' + boxRgb[1] + ',' + boxRgb[2] + ')';

    return setColor;
  }

  function boxTracer() {
    var $this = $(this);
    $this.fadeTo('slow', 0);
    $this.fadeTo('fast', 1);
  }

  function boxShader() {
    var $this = $(this), $opacity = $this.css('opacity');
    if ($opacity > 0.2) {
      $this.css('opacity', $opacity - 0.2);
    }
  }

  function resetSquare() {
    $wrapper.off();
    $square.css({
      'background-color': '',
      opacity: 1
    });
  }

  return {

    startup: init,
    gridDropDown: populateDropDown,
    build: createGrid,
    mouseHandler: $wrapper,
    normal: normalColor,
    random: randomColor,
    tracer: boxTracer,
    shader: boxShader,
    clear: resetSquare
  };
}());

$('#normal').on('click', function () {
  sketch.clear();
  sketch.mouseHandler.on('mouseenter', '.box', sketch.normal);
});

$('#random').on('click', function () {
  sketch.clear();
  sketch.mouseHandler.on('mouseenter', '.box', function () {
    $(this).css('background-color', sketch.random);
  });
});

$('#tracer').on('click', function () {
  sketch.clear();
  sketch.mouseHandler.on('mouseenter', '.box', sketch.tracer);
});

$('#shader').on('click', function () {
  sketch.clear();
  sketch.mouseHandler.on('mouseenter', '.box', sketch.shader);
});

$(document).ready(function () {
  sketch.startup();
});