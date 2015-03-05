(function(root) {

  var Node = function(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  };

  Node.prototype.isEqual = function(node) {
    return (this.x == node.x && this.y = node.y);
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
