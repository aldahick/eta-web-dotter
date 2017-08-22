import * as fs from "fs-extra";
import * as eta from "../eta";
import * as db from "../../../db";
import NetworkClient from "./NetworkClient";

let instance: ConnectionServer;
export class ConnectionServer {
    public clients: NetworkClient[] = [];
    private io: SocketIO.Server;

    public constructor(io: SocketIO.Server) {
        instance = this;
        this.io = io;
        this.setupListeners();
    }

    public init(): Promise<void> { return Promise.resolve(); }

    public async stop(): Promise<void> {
        this.clients.forEach(c => c.close());
        this.io.close();
    }

    public removeClient(client: NetworkClient): void {
        eta.array.remove(this.clients, c => c.id === client.id);
    }

    private setupListeners(): void {
        this.io.on("connection", (s: any) => { return this.onConnect(s); });
    }

    private onConnect(socket: SocketIO.Socket): void {
        const client: NetworkClient = new NetworkClient({
            server: this,
            socket
        });
        client.setup().then(() => {
            eta.logger.trace("A new client has connected.");
            this.clients.push(client);
        }).catch(err => {
            eta.logger.error(err);
        });
    }
}

export default instance;
