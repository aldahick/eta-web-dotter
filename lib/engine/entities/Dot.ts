import Constants from "../Constants";
import Direction from "../Direction";
import IGameEntity from "../IGameEntity";
import GameWindow from "../GameWindow";
import VelocityRectangle from "../shapes/VelocityRectangle";
import Vector2 from "../Vector2";

export default abstract class Dot extends VelocityRectangle implements IGameEntity {
    public window: GameWindow;
    public shouldRemove = false;
    public readonly isAffectedByGravity = true;
    public onFloor = false;
    public color: string;
    /** the direction this dot is facing */
    public direction: Direction;

    public constructor(position: Vector2, color: string, direction: Direction) {
        super(position, new Vector2(Constants.dotWidth, Constants.dotHeight));
        this.color = color;
        this.direction = direction;
    }

    public onRender(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        this.render(context, true);
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

    public turn(): void {
        this.direction = this.direction === Direction.Right ? Direction.Left : Direction.Right;
    }
}
