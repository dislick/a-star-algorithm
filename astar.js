(function() {

  // generate a random two-dimensional map array
  var generateMap = function(width, height, wallDensity) {
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
  };
  var map = generateMap(50, 50, -1);




  /**
   * Executes an A* search alogrithm 
   * @param  {Node} start 
   * @param  {Node} end   
   * @return {[Node]} Returns an array with the path nodes
   */
  var calculatePath = function(map, startNode, endNode) {
    // clear the existing path
    clearPath();

    // set start node type
    startNode.type = TYPE.START;
    endNode.type = TYPE.END;

    // this array holds the next nodes to process
    var openList = [];
    // and this one holds all the nodes that have already been processed
    var closedList = [];

    // push the first node into the array to start the processing loop
    openList.push(startNode);

    // execute this block while there are still nodes that are open
    while (openList.length > 0) {
      // get the node with the smallest F value
      var currentNode = _.min(openList, function(node) { return node.f });
      
      // check if endNode has been found and end the algorithm
      if (currentNode.isEqualPosition(endNode)) {
        // backtrace every parent to determine the path
        var pathNodes = [];
        while (currentNode.parent) {
          pathNodes.push(currentNode);
          currentNode = currentNode.parent;
        }
        pathNodes = pathNodes.reverse();
        pathNodes = pathNodes.splice(0, pathNodes.length - 1);

        var index = 0;
        (function highlightPath() {
          pathNodes[index].type = TYPE.PATH;
          if (index++ >= pathNodes.length - 1) return;
          setTimeout(highlightPath, 1);
        })();

        return true;
      }

      // find neighbors and calculate G and F values
      var neighbors = currentNode.getNeighbors(map);   

      neighbors.forEach(function(neighborNode, index) {
        // if neighbor has already been checked, skip it
        if (_.find(closedList, function(node) { return node === neighborNode }) || neighborNode.isWall()) {
          return;
        }

        var g = currentNode.g + 1;
        var isLowestG = false;

        // if neighbor is not in open list yet, push it in
        if (!_.find(openList, function(node) { return node === neighborNode })) {
          isLowestG = true;
          openList.push(neighborNode);
          neighborNode.h = neighborNode.getHeuristic(neighborNode, endNode, startNode);
        } else if (g < neighborNode.g) {
          isLowestG = true;
        }

        if (isLowestG) {
          neighborNode.parent = currentNode;
          neighborNode.g = g;
          neighborNode.f = neighborNode.g + neighborNode.h;
        }
      });

      // add node to closed list and move on
      closedList.push(currentNode); //currentNode.type = TYPE.CLOSED;
      openList = _.without(openList, currentNode);
    }

  };

  var clearPath = function() {
    map.forEach(function(row) {
      row.forEach(function(node) {
        if (node.type === TYPE.PATH || node.type === TYPE.CLOSED) {
          node.type = TYPE.GROUND;
        }
      });     
    });
  };




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

  setInterval(drawMap, 0);

  canvas.addEventListener('mousemove', function(event) {
    var screenX = Math.floor(event.offsetX / pixelSize);
    var screenY = Math.floor(event.offsetY / pixelSize);
    if (event.shiftKey) {
      map[screenX][screenY].type = TYPE.WALL;  
    }
    if (event.ctrlKey) {
      map[screenX][screenY].type = TYPE.GROUND;  
    }
  });

  document.addEventListener('keyup', function(event) {
    calculatePath(map, map[0][0], map[map.length - 1][map[map.length - 1].length - 1]);
  });
  document.addEventListener('keydown', function(event) {
    clearPath();
  });

  document.querySelector('#clearmap').addEventListener('click', function() {
    map.forEach(function(row) {
      row.forEach(function(node) {
        node.type = TYPE.GROUND;
      });     
    });
  });

  document.querySelector('#clearpath').addEventListener('click', clearPath);

  document.querySelector('#solve').addEventListener('click', function() {
    // simply get the path from the first to the last node
    calculatePath(map, map[0][0], map[map.length - 1][map[map.length - 1].length - 1]);
  });

})();





