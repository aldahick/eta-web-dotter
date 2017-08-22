import * as eta from "../eta";
import * as uuid from "uuid";
import { ConnectionServer } from "./ConnectionServer";

export default class NetworkClient {
    public readonly id: string;
    public socket: SocketIO.Socket;
    public server: ConnectionServer;

    public constructor(init: Partial<NetworkClient>) {
        Object.assign(this, init);
        this.id = uuid.v1();
    }

    public async setup(): Promise<void> {
        this.socket.on("disconnect", this.buildHandler(this.onDisconnect));
    }

    public close(): void {
        this.socket.disconnect();
    }

    public async onDisconnect(): Promise<void> {
        this.server.removeClient(this);
    }

    private buildHandler(method: (...args: any[]) => Promise<void>): (...args: any[]) => void {
        return (data: any, callback: Function) => {
            if (!callback) { callback = () => { }; }
            method.apply(this, [data]).then(callback)
            .catch((err: Error) => {
                eta.logger.trace("Nexus client handler " + method.name + " failed.");
                eta.logger.error(err);
            });
        };
    }
}
