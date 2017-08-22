import * as eta from "../eta";
import * as socketIO from "socket.io";
import { ConnectionServer } from "../lib/ConnectionServer";
import * as net from "../lib/index";

export default class SocketIOLifecycle extends eta.ILifecycleHandler {
    public async beforeServerStart(): Promise<void> {
        const io: SocketIO.Server = socketIO(this.server.server);
        (<any>net).ConnectionServer = new ConnectionServer(io);
        await net.ConnectionServer.init();
    }

    public async onServerStop(): Promise<void> {
        if (net.ConnectionServer) {
            await net.ConnectionServer.stop();
        }
    }
}
