// generate:sort-first
import Direction from "../Direction";
import IGameEntity from "../IGameEntity";
import GameWindow from "../GameWindow";
import VelocityRectangle from "../shapes/VelocityRectangle";
import Vector2 from "../Vector2";

export default abstract class Dot extends VelocityRectangle implements IGameEntity {
    public window: GameWindow;
    public onFloor = false;
    public color: string;

    public constructor(position: Vector2, color: string) {
        super(position, new Vector2(32, 32));
        this.color = color;
    }

    public onRender(context: CanvasRenderingContext2D): void {
        context.beginPath();
        const radius: number = this.size.x / 2;
        context.arc(this.position.x + radius, this.position.y + radius, radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    public onUpdate(): void {
        this.decelerate();
        this.move();
        this.checkBoundaries(this.window.size);
    }

    public accelerate(direction: Direction): void {
        if (direction === Direction.Left || direction === Direction.Right) return super.accelerate(direction);
        if (direction === Direction.Up) this.velocity.y -= 1;
        // do nothing if down
    }
}
