import io from "socket.io-client";
import * as engine from "dotter/game/engine/index.js";
import * as entities from "dotter/game/entities/index.js";

export default class NetworkClient {
    public window: engine.GameWindow;
    public socket: SocketIOClient.Socket;
    public players: {[key: string]: entities.Bot}; // key: uid

    public constructor(window: engine.GameWindow) {
        this.window = window;
        this.socket = io();
        this.socket.on("self:ready", this.onSelfReady.bind(this));
        this.socket.on("player:join", this.onPlayerJoin.bind(this));
        this.socket.on("player:accelerate", this.onPlayerAccelerate.bind(this));
        this.socket.emit("join");
    }

    // TODO: CONTINUE
    private onSelfReady(): void { }

    private onPlayerJoin(player: engine.NetworkPlayer): void {
        this.players[player.id] = new entities.Bot(this.window.getMiddle(), player.color);
        this.window.addEntity(this.players[player.id]);
    }

    private onPlayerAccelerate(playerId: string, direction: engine.Direction): void {
        this.players[playerId].accelerate(direction);
    }
}
