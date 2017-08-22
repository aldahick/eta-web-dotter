import * as engine from "dotter/game/engine/index.js";
import * as entities from "dotter/game/entities/index.js";

export default class Game {
    public window: engine.GameWindow;
    public player: entities.Player;

    public constructor(canvas: HTMLCanvasElement) {
        this.window = new engine.ClientWindow(canvas);
        this.window.addEntity(new entities.Floor(this.window));
        this.player = new entities.Player(new engine.Vector2(canvas.width / 2, canvas.height / 2), "green");
        this.window.addEntity(this.player);
        (<any>window).game = this;
    }

    public start(): void {
        this.window.start();
    }
}
