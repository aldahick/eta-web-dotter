import Direction from "../Direction";
import Dot from "./Dot.js";

export default class Player extends Dot {
    private handlers: {[key: string]: Function[]} = {};
    protected jumpStart: number;

    public onUpdate(): void {
        super.onUpdate();
    }

    public on(eventName: string, callback: Function): void {
        if (!this.handlers[eventName]) this.handlers[eventName] = [];
        this.handlers[eventName].push(callback);
    }

    public emit(eventName: string, ...args: any[]): void {
        if (!this.handlers[eventName]) return;
        this.handlers[eventName].forEach(f => f(args[0], args[1], args[2]));
    }

    public jump(): void {
        if (this.jumpStart === undefined) {
            if (!this.onFloor) return;
            this.jumpStart = Date.now();
        }
        if (Date.now() - this.jumpStart <= 600) { // 1 second
            this.accelerate(Direction.Up);
            this.emit("accelerate", Direction.Up);
        }
    }
}
