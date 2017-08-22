// generate:sort-first

import Vector2 from "../Vector2.js";

export default abstract class Rectangle {
    public position: Vector2;
    public size: Vector2;
    public created: Date;

    public constructor(position: Vector2, size: Vector2) {
        this.position = position;
        this.size = size;
        this.created = new Date();
    }

    public isColliding(other: Rectangle): boolean {
        return ((
            this.position.x <= other.position.x + other.size.x
        ) && (
            other.position.x <= this.position.x + this.size.x
        ) && (
            this.position.y <= other.position.y + other.size.y
        ) && (
            other.position.y <= this.position.y + this.size.y
        ));
    }

    /** Does not modify fillStyle or strokeStyle */
    public render(context: CanvasRenderingContext2D, useFill = true): void {
        context.beginPath();
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x + this.size.x, this.position.y);
        context.lineTo(this.position.x + this.size.x, this.position.y + this.size.y);
        context.lineTo(this.position.x, this.position.y + this.size.y);
        context.lineTo(this.position.x, this.position.y);
        if (useFill) context.fill();
        else context.stroke();
        context.closePath();
    }
}
