(function() {

  var map = (function(width, height, wallDensity) {
    var _map = [];
    for (var x = 0; x < width; x++) {
      var _row = [];
      for (var y = 0; y < height; y++) {
        var isWall = (Math.floor(Math.random() * wallDensity) === 0);
        _row.push(new Node(x, y, (isWall) ? TYPE.WALL : TYPE.GROUND));
      }  
      _map.push(_row);
    }
    return _map;
  })(50, 50, 7);

  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');
  var pixelSize = 10;

  var drawMap = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    map.forEach(function(row) {
      row.forEach(function(node) {
        context.fillStyle = COLORS[node.type];
        context.fillRect(node.x * pixelSize, node.y * pixelSize, pixelSize, pixelSize);
      });     
    });
  };

  setInterval(drawMap, 10);

  canvas.addEventListener('click', function(event) {
    var screenX = Math.floor(event.offsetX / pixelSize);
    var screenY = Math.floor(event.offsetY / pixelSize);
    // do something
  });

})();





