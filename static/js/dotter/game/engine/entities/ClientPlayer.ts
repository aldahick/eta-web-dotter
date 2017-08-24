import * as engine from "dotter/engine.js";
import ClientWindow from "dotter/game/engine/ClientWindow.js";

export default class ClientPlayer extends engine.Player {
    public window: ClientWindow;

    public onUpdate(): void {
        super.onUpdate();
        if (this.isKeyPressed(JQuery.Key.ArrowUp) || this.isKeyPressed(JQuery.Key.W)) {
            this.jump();
        } else {
            this.jumpStart = undefined;
        }
        if (this.isKeyPressed(JQuery.Key.ArrowRight) || this.isKeyPressed(JQuery.Key.D)) {
            this.accelerate(engine.Direction.Right);
            this.emit("accelerate", engine.Direction.Right);
        }
        if (this.isKeyPressed(JQuery.Key.ArrowLeft) || this.isKeyPressed(JQuery.Key.A)) {
            this.accelerate(engine.Direction.Left);
            this.emit("accelerate", engine.Direction.Left);
        } // ignore down arrow
        if (this.isKeyPressed(JQuery.Key.F)) {
            this.fire();
            this.emit("fire");
        }
        this.checkBoundaries(this.window.size);
    }

    private isKeyPressed(key: JQuery.Key) {
        return !!this.window.keysPressed[key];
    }
}
