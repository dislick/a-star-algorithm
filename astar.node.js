(function(root) {

  var Node = function(x, y, type) {
    this.x = x;
    this.y = y;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.type = type;
    this.parent;
  };

  Node.prototype.isEqualPosition = function(node) {
    return (this.x == node.x && this.y == node.y);
  };

  Node.prototype.isWall = function() {
    return (this.type === TYPE.WALL);
  };

  Node.prototype.getHeuristic = function(pos0, pos1, startNode) {
    // Manhatten Distanz
    var horizontalDistance = Math.abs(pos1.x - pos0.x);
    var verticalDistance = Math.abs(pos1.y - pos0.y);
    var heuristic = horizontalDistance + verticalDistance;  

    var dx1 = pos0.x - pos1.x
    var dy1 = pos0.y - pos1.y
    var dx2 = startNode.x - pos1.x
    var dy2 = startNode.y - pos1.y
    var cross = Math.abs(dx1*dy2 - dx2*dy1)
    heuristic += cross * 0.001
    return heuristic;
  };

  Node.prototype.getNeighbors = function(map) {
    var neighbors = [];
    // shortcuts to coordinates as they are used often below
    var x = this.x;
    var y = this.y;
   
    /*
      | 0 | 1  | 2  | 3  | 4 |
      | 1 |    | #1 |    |   |
      | 2 | #4 | X  | #2 |   |
      | 3 |    | #3 |    |   |
      | 4 |    |    |    |   |
    */

    // #4 left
    if (map[x - 1] && map[x - 1][y]) 
    {
      neighbors.push(map[x - 1][y]);
    }
    // #2 right
    if (map[x + 1] && map[x + 1][y]) 
    {
      neighbors.push(map[x + 1][y]);
    }
    // #1 top
    if (map[x] && map[x][y - 1])
    {
      neighbors.push(map[x][y - 1]);
    }
    // #3 bottom
    if (map[x] && map[x][y + 1])
    {
      neighbors.push(map[x][y + 1]);
    }

    return neighbors;
  };

  this.Node = Node;

})(this);
