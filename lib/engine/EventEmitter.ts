export default class EventEmitter {
    private handlers: {[key: string]: Function[]} = {};

    public on(eventName: string, callback: Function): void {
        if (!this.handlers[eventName]) this.handlers[eventName] = [];
        this.handlers[eventName].push(callback);
    }

    public emit(eventName: string, ...args: any[]): void {
        if (!this.handlers[eventName]) return;
        this.handlers[eventName].forEach(f => f(args[0], args[1], args[2]));
    }
}
