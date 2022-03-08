import * as PIXI from "pixi.js";
import {Container} from "pixi.js";

export class Pieces{
  private data: any;
  private alpha: number | undefined;
  private dragging: boolean | undefined;
  constructor(space: number, stage: PIXI.Container) {
    this.makeShapes([0xe74c3c, 0x217bb8, 0x2c3e50, 0xf1c40f, 0xf1c40f, 0xf1c40f, 0xf1c40f], [
      [0,2,1,2,1,4,2,4,2,5,0,5],
      [3,2,4,2,4,3,5,3,5,4,3,4],
      [6,2,7,2,7,3,8,3,8,4,7,4,7,5,6,5],
      [9,2,10,2,10,4,11,4,11,5,9,5],
      [12,2,13,2,13,6,12,6],
      [14,2,15,2,15,3,14,3],
      [16,2,19,2,19,4,18,4,18,3,17,3,17,4,16,4]

    ], space, stage)
  }
  makeShapes(colour: any[], shape: number[][], space: number, container: Container){
    let corners: number[] = []
    let Shape= new PIXI.Graphics()
    for(let i = 0; i < colour.length; i++){
      container.addChild(this.createShape(colour[i], shape[i], space))
    }
    console.log(container)
  }
  createShape(colour: any, shape: number[], space: number){
    let Shape= new PIXI.Graphics()
    let corners: number[] = []
    Shape.beginFill(colour);
    for(let ii = 0; ii < shape.length; ii++){
      corners.push(shape[ii] * space)
    }
    Shape.drawPolygon(corners)
    Shape.interactive = true;
    Shape.buttonMode = true;
    // events for drag start
    Shape.on('mousedown', this.onDragStart)
      .on('touchstart', this.onDragStart)
      // events for drag end
      .on('mouseup', this.onDragEnd)
      .on('mouseupoutside', this.onDragEnd)
      .on('touchend', this.onDragEnd)
      .on('touchendoutside', this.onDragEnd)
      // events for drag move
      .on('mousemove', this.onDragMove)
      .on('touchmove', this.onDragMove);
    Shape.name = "test"
    return Shape
  }
  onDragStart()
  {
   console.log(this)
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    //this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    //console.log(this.data)
  }

  onDragEnd(event: any)
  {
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
  }

  onDragMove(event: any)
  {
    if (event.dragging)
    {
      console.log(this)
      console.log(event.x)
      console.log(event.y)
      console.log(event.data)
      console.log(event.currentTarget)
      event.set(500, 300)
      //var newPosition = event.data.getLocalPosition(event);
      //console.log(event)
      //this.position.x = newPosition.x;
      //this.position.y = newPosition.y;
    }
  }
}

