import Constants from "../Constants";
import Dot from "./Dot.js";
import IGameEntity from "../IGameObject";
import GameWindow from "../GameWindow";
import Rectangle from "../shapes/Rectangle";
import VelocityRectangle from "../shapes/VelocityRectangle";
import Vector2 from "../Vector2";

export default class Surface extends Rectangle implements IGameEntity {
    public window: GameWindow;
    public readonly isAffectedByGravity = false;
    public readonly shouldRemove = false;

    public onRender(context: CanvasRenderingContext2D): void {
        context.fillStyle = "gray"; // TODO: Replace with config
        this.render(context, true);
    }

    public onUpdate(): void {
        // collision checks!
        this.window.entities.forEach(e => {
            if (!(e instanceof VelocityRectangle)) return;
            if (e.isAffectedByGravity && e.position.y + e.size.y < this.position.y) { // in the air
                e.velocity.y -= Constants.gravity;
            } else if (e.position.y + e.size.y > this.position.y) { // in the... floor?
                e.position.y = this.position.y - e.size.y; // reset position to ground level
                e.velocity.y = 0; // dead stop
            } else {
                const vy = e.velocity.y;
                e.velocity = e.velocity.toZero(0.20);
                e.velocity.y = vy;
            }
            if (e instanceof Dot) {
                e.onSurface = e.position.y + e.size.y === this.position.y;
            }
        });
    }
}
