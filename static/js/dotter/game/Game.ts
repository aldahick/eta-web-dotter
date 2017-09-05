import * as engine from "dotter/game/engine/index.js";
import NetworkClient from "dotter/game/network/NetworkClient.js";

(<any>window).engine = engine;
export default class Game {
    public window: engine.GameWindow;
    public player: engine.ClientPlayer;
    public network: NetworkClient;

    public constructor(canvas: HTMLCanvasElement) {
        this.window = new engine.ClientWindow(canvas);
        this.window.addObject(new engine.Floor(this.window));
        this.network = new NetworkClient(this);
        (<any>window).game = this;
    }

    public start(): void {
        this.window.start();
    }
}
