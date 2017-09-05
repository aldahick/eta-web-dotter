import Bullet from "./Bullet";
import Constants from "../Constants";
import Direction from "../Direction";
import Dot from "./Dot.js";
import Vector2 from "../Vector2";

export default class Player extends Dot {
    protected jumpStart: number;
    protected lastFireTime: number;
    public id: string;

    public constructor(position: Vector2, color: string, direction: Direction, id: string) {
        super(position, color, direction);
        this.id = id;
    }

    public onUpdate(): void {
        super.onUpdate();
    }

    public accelerate(direction: Direction): void {
        super.accelerate(direction);
        if ((direction === Direction.Left || direction === Direction.Right) && direction !== this.direction) {
            this.direction = direction;
        }
    }

    public fire(): void {
        if (Date.now() - this.lastFireTime < Constants.playerFireInterval) return;
        this.lastFireTime = Date.now();
        const bulletPositionDiff: Vector2 = new Vector2(this.direction === Direction.Left ? Constants.bulletDiameter : this.size.x, 12);
        const bulletVelocity: Vector2 = new Vector2(
            (this.direction === Direction.Left ? -1 : 1) * Constants.bulletVelocity,
            this.velocity.y);
        const bullet: Bullet = new Bullet(this.position.add(bulletPositionDiff), bulletVelocity, this.id);
        this.window.addEntity(bullet);
    }

    public jump(): void {
        if (this.jumpStart === undefined) {
            if (!this.onSurface) return;
            this.jumpStart = Date.now();
        }
        if (Date.now() - this.jumpStart <= Constants.playerJumpInterval) {
            this.accelerate(Direction.Up);
            this.emit("accelerate", Direction.Up);
        }
    }
}
