import Bullet from "./Bullet";
import Direction from "../Direction";
import Dot from "./Dot.js";
import Vector2 from "../Vector2";

export default class Player extends Dot {
    protected jumpStart: number;
    public id: string;

    public constructor(position: Vector2, color: string, id: string) {
        super(position, color);
        this.id = id;
    }

    public onUpdate(): void {
        super.onUpdate();
    }

    public fire(): void {
        const bullet: Bullet = new Bullet(this.position.add(new Vector2(this.size.x, 0)), new Vector2(20, this.velocity.y), this.id);
        this.window.addEntity(bullet);
    }

    public jump(): void {
        if (this.jumpStart === undefined) {
            if (!this.onFloor) return;
            this.jumpStart = Date.now();
        }
        if (Date.now() - this.jumpStart <= 600) { // 1 second
            this.accelerate(Direction.Up);
            this.emit("accelerate", Direction.Up);
        }
    }
}
