import * as engine from "dotter/game/engine/index.js";
import Dot from "dotter/game/entities/Dot.js";
import NetworkClient from "dotter/game/network/NetworkClient.js";

export default class Player extends Dot {
    private jumpStart: number;

    public onUpdate(): void {
        super.onUpdate();
        if (this.isKeyPressed(JQuery.Key.ArrowUp) || this.isKeyPressed(JQuery.Key.W)) {
            this.tryJump();
        } else {
            this.jumpStart = undefined;
        }
        if (this.isKeyPressed(JQuery.Key.ArrowRight) || this.isKeyPressed(JQuery.Key.D)) {
            this.accelerate(engine.Direction.Right);
        }
        if (this.isKeyPressed(JQuery.Key.ArrowLeft) || this.isKeyPressed(JQuery.Key.A)) {
            this.accelerate(engine.Direction.Left);
        } // ignore down arrow
        this.checkBoundaries(this.window.size);
    }

    private tryJump(): void {
        if (this.jumpStart === undefined) {
            if (!this.onFloor) return;
            this.jumpStart = Date.now();
        }
        if (Date.now() - this.jumpStart <= 600) { // 1 second
            this.accelerate(engine.Direction.Up);
        }
    }

    private isKeyPressed(key: JQuery.Key) {
        return !!this.window.keysPressed[key];
    }
}
