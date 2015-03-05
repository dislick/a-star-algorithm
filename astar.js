(function() {

  var TYPE = {
    GROUND: 1,
    WALL: 2
  };

  var Node = function(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  };

  var map = (function(width, height, wallDensity) {
    var _map = [];
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var isWall = (Math.floor(Math.random() * wallDensity) === 0);
        _map.push(new Node(x, y, (isWall) ? TYPE.WALL : TYPE.GROUND));
      }  
    }
    return _map;
  })(80, 80, 7);

  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');
  var pixelSize = 10;

  var drawMap = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    map.forEach(function(node) {      
      context.fillStyle = (node.type === TYPE.GROUND) ? '#E2E2E2' : '#000';
      context.fillRect(node.x * pixelSize, node.y * pixelSize, pixelSize, pixelSize);
    });
  };


})();
