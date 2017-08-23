import * as engine from "dotter/engine.js";

export default class ClientWindow extends engine.GameWindow {
    public readonly canvas: HTMLCanvasElement;
    public readonly context: CanvasRenderingContext2D;
    public readonly keysPressed: {[key: number]: boolean} = {};

    public constructor(canvas: HTMLCanvasElement) {
        super(new engine.Vector2(canvas.width, canvas.height));
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    public start(): void {
        $(document)
            .on("keydown", this.onKeyDown.bind(this))
            .on("keyup", this.onKeyUp.bind(this));
        super.start();
    }

    protected loop(): void {
        this.render();
        super.loop();
    }

    private render(): void {
        this.context.clearRect(0, 0, this.size.x, this.size.y);
        this.entities.forEach(e => e.onRender(this.context));
    }

    private onKeyDown(evt: JQuery.Event): void {
        this.keysPressed[evt.which] = true;
    }

    private onKeyUp(evt: JQuery.Event): void {
        this.keysPressed[evt.which] = false;
    }
}
