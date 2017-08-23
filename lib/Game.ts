import * as engine from "./engine/index";

export default class Game {
    public window: engine.GameWindow;
    public players: {[key: string]: engine.Player} = {};
    public isStarted = false;

    public constructor() {
        this.window = new engine.GameWindow(new engine.Vector2(1024, 512));
        this.window.addEntity(new engine.Floor(this.window));
    }

    public start(): void {
        this.window.start();
        this.isStarted = true;
    }

    public addPlayer(id: string, color: string): void {
        this.players[id] = new engine.Player(this.window.getMiddle(), color);
        this.window.addEntity(this.players[id]);
    }
}
