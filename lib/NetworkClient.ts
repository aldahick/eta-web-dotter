import * as eta from "../eta";
import * as uuid from "uuid";
import * as engine from "./engine/index";
import { ConnectionServer } from "./ConnectionServer";
import HelperColor from "./helpers/HelperColor";

export default class NetworkClient {
    public readonly id: string;
    public readonly color: string;
    public socket: SocketIO.Socket;
    public server: ConnectionServer;
    public justConnected = true;

    public constructor(init: Partial<NetworkClient>) {
        Object.assign(this, init);
        this.id = uuid.v1();
        this.color = HelperColor.nextColor();
    }

    public async setup(): Promise<void> {
        this.onSelfJoin();
        this.socket.on("accelerate", this.onAccelerate.bind(this));
        this.socket.on("fire", this.onFire.bind(this));
        this.socket.on("turn", this.onTurn.bind(this));
        this.socket.on("disconnect", this.onDisconnect.bind(this));
    }

    public close(): void {
        this.socket.disconnect();
    }

    public onSelfJoin(): void {
        const player: engine.NetworkPlayer = {
            id: this.id,
            color: this.color,
            position: this.server.game.window.getMiddle(),
            direction: engine.Direction.Right
        };
        this.server.game.addPlayer(player);
        this.server.game.players[this.id].on("die", this.onSelfDie.bind(this));
        this.socket.emit("self:ready", player);
        this.socket.broadcast.emit("player:join", player);
        if (this.justConnected) {
            Object.keys(this.server.game.players).forEach(k => {
                if (k === this.id) return;
                this.socket.emit("player:join", <engine.NetworkPlayer>{
                    id: k,
                    color: this.server.game.players[k].color,
                    position: this.server.game.players[k].position,
                    direction: this.server.game.players[k].direction
                });
            });
            this.justConnected = false;
        }
    }

    public onAccelerate(direction: engine.Direction): void {
        this.socket.broadcast.emit("player:accelerate", this.id, direction);
        this.server.game.players[this.id].accelerate(direction);
    }

    public onFire(): void {
        this.socket.broadcast.emit("player:fire", this.id);
        this.server.game.players[this.id].fire();
    }

    public onTurn(): void {
        this.server.game.players[this.id].turn();
        this.socket.broadcast.emit("player:turn", this.id);
    }

    public onDisconnect(): void {
        this.removePlayer();
        this.server.removeClient(this);
    }

    public onSelfDie(): void {
        this.socket.emit("self:die");
        this.socket.broadcast.emit("player:die", this.id);
        this.removePlayer();
        setTimeout(() => {
            this.onSelfJoin();
        }, 1000);
    }

    public removePlayer(): void {
        eta.array.remove(this.server.game.window.objects, e => {
            if (e instanceof engine.Player) return e.id === this.id;
            else return false;
        });
        delete this.server.game.players[this.id];
    }
}
