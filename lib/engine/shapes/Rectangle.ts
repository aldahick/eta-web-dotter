import EventEmitter from "../EventEmitter";
import Vector2 from "../Vector2";

export default abstract class Rectangle extends EventEmitter {
    public position: Vector2;
    public size: Vector2;
    public created: Date;

    public constructor(position: Vector2, size: Vector2) {
        super();
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
        const method = useFill ? context.fillRect : context.strokeRect;
        method.apply(context, [this.position.x, this.position.y, this.size.x, this.size.y]);
        context.closePath();
    }
}
