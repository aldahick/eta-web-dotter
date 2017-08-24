import Dot from "./Dot.js";
import IGameEntity from "../IGameEntity";
import GameWindow from "../GameWindow";
import Rectangle from "../shapes/Rectangle";
import VelocityRectangle from "../shapes/VelocityRectangle";
import Vector2 from "../Vector2";

const FLOOR_HEIGHT = 128; // pixels
// (g = -9.8 m/s^2 = -9.8/40 m/25ms^2 = -0.245 meters / 25 ms^2 = -0.0245 pixels / 25 ms^2)
const GRAVITATIONAL_CONSTANT = -0.5; // ... it's complicated.

export default class Floor extends Rectangle implements IGameEntity {
    public window: GameWindow;
    public readonly isAffectedByGravity = false;
    public readonly shouldRemove = false;

    public constructor(window: GameWindow) {
        super(new Vector2(0, window.size.y - FLOOR_HEIGHT), new Vector2(window.size.x, FLOOR_HEIGHT));
    }

    public onRender(context: CanvasRenderingContext2D): void {
        context.fillStyle = "gray"; // TODO: Replace with config
        this.render(context, true);
    }

    public onUpdate(): void {
        // collision checks!
        this.window.entities.forEach(e => {
            if (!(e instanceof VelocityRectangle)) return;
            if (e.isAffectedByGravity && e.position.y + e.size.y < this.position.y) { // in the air
                e.velocity.y -= GRAVITATIONAL_CONSTANT;
            } else if (e.position.y + e.size.y > this.position.y) { // in the... floor?
                e.position.y = this.position.y - e.size.y; // reset position to ground level
                e.velocity.y = 0; // dead stop
            } else {
                const vy = e.velocity.y;
                e.velocity = e.velocity.toZero(0.20);
                e.velocity.y = vy;
            }
            if (e instanceof Dot) {
                e.onFloor = e.position.y + e.size.y === this.position.y;
            }
        });
    }
}
