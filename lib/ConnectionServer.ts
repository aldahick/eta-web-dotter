import * as fs from "fs-extra";
import * as eta from "../eta";
import * as db from "../../../db";
import Game from "./Game";
import NetworkClient from "./NetworkClient";
import * as engine from "./engine/index";

let instance: ConnectionServer;
export class ConnectionServer {
    public clients: {[key: string]: NetworkClient} = {};
    public game: Game;
    private io: SocketIO.Server;

    public constructor(io: SocketIO.Server) {
        instance = this;
        this.io = io;
        this.game = new Game();
        this.setupListeners();
    }

    public init(): Promise<void> { return Promise.resolve(); }

    public async stop(): Promise<void> {
        Object.keys(this.clients).forEach(k => this.clients[k].close());
        this.io.close();
    }

    public removeClient(client: NetworkClient): void {
        delete this.clients[client.id];
    }

    private setupListeners(): void {
        this.io.on("connection", (s: any) => { return this.onConnect(s); });
    }

    private onConnect(socket: SocketIO.Socket): void {
        if (!this.game.isStarted) this.game.start();
        const client: NetworkClient = new NetworkClient({
            server: this,
            socket
        });
        client.setup().then(() => {
            eta.logger.trace("A new client has connected.");
            this.clients[client.id] = client;
        }).catch(err => {
            eta.logger.error(err);
        });
    }
}

export default instance;
