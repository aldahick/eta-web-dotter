import * as engine from "./engine/index";

export default class Game {
    public window: engine.GameWindow;
    public players: {[key: string]: engine.Player} = {};
    public isStarted = false;

    public constructor() {
        this.window = new engine.GameWindow(new engine.Vector2(1024, 512));
        this.window.addObject(new engine.Floor(this.window));
    }

    public start(): void {
        this.window.start();
        this.isStarted = true;
    }

    public addPlayer(player: engine.NetworkPlayer): void {
        this.players[player.id] = new engine.Player(player.position, player.color, player.direction, player.id);
        this.window.addObject(this.players[player.id]);
    }
}
