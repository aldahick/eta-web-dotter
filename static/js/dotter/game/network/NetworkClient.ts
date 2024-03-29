import io from "socket.io-client";
import * as engine from "dotter/game/engine/index.js";
import Game from "dotter/game/Game.js";

export default class NetworkClient {
    public me: engine.NetworkPlayer;
    public game: Game;
    public socket: SocketIOClient.Socket;
    public players: {[key: string]: engine.Player} = {}; // key: uid

    public constructor(game: Game) {
        this.game = game;
        this.socket = io();
        this.socket.on("self:ready", this.onSelfReady.bind(this));
        this.socket.on("player:join", this.onPlayerJoin.bind(this));
        this.socket.on("player:accelerate", this.onPlayerAccelerate.bind(this));
        this.socket.on("player:fire", this.onPlayerFire.bind(this));
        this.socket.on("player:turn", this.onPlayerTurn.bind(this));
    }

    private onSelfReady(player: engine.NetworkPlayer): void {
        $("#loading-message").hide();
        this.me = player;
        this.game.player = new engine.ClientPlayer(new engine.Vector2(player.position.x, player.position.y), player.color, player.direction, player.id);
        this.game.player.isActualPlayer = true;
        this.game.player.on("accelerate", this.onSelfAccelerate.bind(this));
        this.game.player.on("fire", this.onSelfFire.bind(this));
        this.game.player.on("turn", this.onSelfTurn.bind(this));
        this.game.player.on("die", this.onSelfDie.bind(this));
        this.game.window.addObject(this.game.player);
    }

    private onPlayerJoin(player: engine.NetworkPlayer): void {
        this.players[player.id] = new engine.ClientPlayer(new engine.Vector2(player.position.x, player.position.y), player.color, player.direction, player.id);
        this.game.window.addObject(this.players[player.id]);
    }

    private onPlayerAccelerate(playerId: string, direction: engine.Direction): void {
        this.players[playerId].accelerate(direction);
    }

    private onPlayerFire(playerId: string): void {
        this.players[playerId].fire();
    }

    private onPlayerTurn(playerId: string): void {
        this.players[playerId].turn();
    }

    private onSelfAccelerate(direction: engine.Direction): void {
        this.socket.emit("accelerate", direction);
    }

    private onSelfFire(): void {
        this.socket.emit("fire");
    }

    private onSelfTurn(): void {
        this.socket.emit("turn");
    }

    private onSelfDie(): void {
        console.log("self died");
    }
}
