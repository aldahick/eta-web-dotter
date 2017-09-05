import Constants from "../Constants";
import Entity from "./Entity";
import GameWindow from "../GameWindow";
import IGameObject from "../IGameObject";
import Player from "./Player";
import Vector2 from "../Vector2";
import VelocityRectangle from "../shapes/VelocityRectangle";

export default class Bullet extends Entity {
    public window: GameWindow;
    public shouldRemove = false;
    public readonly isAffectedByGravity = false;
    public ownerId: string;

    public constructor(position: Vector2, velocity: Vector2, ownerId: string) {
        super(position, new Vector2(Constants.bulletDiameter, Constants.bulletDiameter));
        this.velocity = velocity;
        this.ownerId = ownerId;
    }

    public onUpdate(): void {
        this.move();
        if (this.checkBoundaries(this.window.size)) this.shouldRemove = true;
        this.window.objects.forEach(o => {
            if (!(o instanceof Player)) return;
            if (o.isColliding(this)) { // bullet has hit another dot
                o.shouldRemove = true;
                this.shouldRemove = true;
                // TODO Show chat message
                o.emit("die");
            }
        });
    }

    public onRender(context: CanvasRenderingContext2D): void {
        context.beginPath();
        const radius: number = this.size.x / 2;
        context.arc(this.position.x + radius, this.position.y + radius, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "black";
        context.fill();
        context.closePath();
    }
}
