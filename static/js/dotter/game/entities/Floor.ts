import * as engine from "dotter/game/engine/index.js";
import Dot from "dotter/game/entities/Dot.js";

const FLOOR_HEIGHT = 128; // pixels
// (g = -9.8 m/s^2 = -9.8/40 m/25ms^2 = -0.245 meters / 25 ms^2 = -0.0245 pixels / 25 ms^2)
const GRAVITATIONAL_CONSTANT = -0.5; // ... it's complicated.

export default class Floor extends engine.Rectangle implements engine.IGameEntity {
    public window: engine.ClientWindow;

    public constructor(window: engine.GameWindow) {
        super(new engine.Vector2(0, window.size.y - FLOOR_HEIGHT), new engine.Vector2(window.size.x, FLOOR_HEIGHT));
    }

    public onRender(): void {
        this.window.context.fillStyle = "gray"; // TODO: Replace with config
        this.render(this.window.context);
    }

    public onUpdate(): void {
        // collision checks!
        this.window.entities.forEach(e => {
            if (e === this) return; // duh
            if (!(e instanceof engine.VelocityRectangle)) return; // also duh
            if (e.position.y + e.size.y < this.position.y) { // in the air
                e.velocity.y -= GRAVITATIONAL_CONSTANT;
            } else if (e.position.y + e.size.y > this.position.y) { // in the... floor?
                e.position.y = this.position.y - e.size.y; // reset position to ground level
                e.velocity.y = 0; // dead stop
            }
            if (e instanceof Dot) {
                e.onFloor = e.position.y + e.size.y === this.position.y;
            }
        });
    }
}
