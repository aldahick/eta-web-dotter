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

    public constructor(init: Partial<NetworkClient>) {
        Object.assign(this, init);
        this.id = uuid.v1();
        this.color = HelperColor.nextColor();
    }

    public async setup(): Promise<void> {
        this.onSelfJoin();
        this.socket.on("accelerate", this.onAccelerate.bind(this));
        this.socket.on("disconnect", this.onDisconnect.bind(this));
    }

    public close(): void {
        this.socket.disconnect();
    }

    public onSelfJoin(): void {
        this.server.game.addPlayer(this.id, this.color);
        const player: engine.NetworkPlayer = {
            id: this.id,
            color: this.color,
            position: this.server.game.players[this.id].position
        };
        this.socket.emit("self:ready", player);
        this.socket.broadcast.emit("player:join", player);
        Object.keys(this.server.game.players).forEach(k => {
            if (k === this.id) return;
            this.socket.emit("player:join", <engine.NetworkPlayer>{
                id: k,
                color: this.server.game.players[k].color,
                position: this.server.game.players[k].position
            });
        });
    }

    public onAccelerate(direction: engine.Direction): void {
        this.socket.broadcast.emit("player:accelerate", this.id, direction);
        this.server.game.players[this.id].accelerate(direction);
    }

    public onDisconnect(): void {
        this.server.removeClient(this);
    }
}
