import io from "socket.io-client";
import * as engine from "dotter/game/engine/index.js";
import Game from "dotter/game/Game.js";

export default class NetworkClient {
    public me: engine.NetworkPlayer;
    public game: Game;
    public socket: SocketIOClient.Socket;
    public players: {[key: string]: engine.Bot} = {}; // key: uid

    public constructor(game: Game) {
        this.game = game;
        this.socket = io();
        this.socket.on("self:ready", this.onSelfReady.bind(this));
        this.socket.on("player:join", this.onPlayerJoin.bind(this));
        this.socket.on("player:accelerate", this.onPlayerAccelerate.bind(this));
    }

    private onSelfReady(player: engine.NetworkPlayer): void {
        $("#loading-message").hide();
        this.me = player;
        this.game.player = new engine.ClientPlayer(new engine.Vector2(player.position.x, player.position.y), player.color);
        this.game.player.on("accelerate", this.onSelfAccelerate.bind(this));
        this.game.window.addEntity(this.game.player);
    }

    private onPlayerJoin(player: engine.NetworkPlayer): void {
        this.players[player.id] = new engine.Player(new engine.Vector2(player.position.x, player.position.y), player.color);
        this.game.window.addEntity(this.players[player.id]);
    }

    private onPlayerAccelerate(playerId: string, direction: engine.Direction): void {
        this.players[playerId].accelerate(direction);
    }

    private onSelfAccelerate(direction: engine.Direction): void {
        this.socket.emit("accelerate", direction);
    }
}
