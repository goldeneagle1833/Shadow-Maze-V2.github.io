class Vision {
  constructor(pos, direction) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(direction);

  }
  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0,0, this.dir.x * 100, this.dir.y * 100);
    pop();
  }
  rayCheck(x,y) {
      this.pos.set(x,y)
  }

  //cast is need because the when drawing the players visions needs to be shown from players postion to the wall of the maze and that is done by checking the vector created against all of the walls in the maze

  //cast is using line line intersection formula found https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

  //this section is directly from this time stamp
  //https://youtu.be/TOEi6T2mtHo?t=609

  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;
    // walls defining points

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;
    // the players vision is define in rays and is defined by the line segmint pulse the angle of the ray

    const denOfFormula = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    //this if statment is need to show if the ray and the wall is perfectly parrell
    if (denOfFormula == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denOfFormula;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denOfFormula;

    //The intersection point falls within the first line segment if 0.0 ≤ t ≤ 1.0, and it falls within the second line segment if 0.0 ≤ u ≤ 1.0.

    // this if statment is checking the above comment statement
    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
}
