import Constants from "../Constants";
import GameWindow from "../GameWindow";
import IGameEntity from "../IGameEntity";
import Player from "./Player";
import Vector2 from "../Vector2";
import VelocityRectangle from "../shapes/VelocityRectangle";

export default class Bullet extends VelocityRectangle implements IGameEntity {
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
        this.window.entities.forEach(e => {
            if (!(e instanceof Player)) return;
            if (e.isColliding(this)) { // bullet has hit another dot
                e.shouldRemove = true;
                this.shouldRemove = true;
                // TODO Show chat message
                e.emit("die");
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
