import * as engine from "dotter/game/engine/index.js";

export default abstract class Dot extends engine.VelocityRectangle implements engine.IGameEntity {
    public window: engine.ClientWindow;
    public onFloor = false;
    public color: string;

    public constructor(position: engine.Vector2, color: string) {
        super(position, new engine.Vector2(32, 32));
        this.color = color;
    }

    public onRender(): void {
        this.window.context.beginPath();
        const radius: number = this.size.x / 2;
        this.window.context.arc(this.position.x + radius, this.position.y + radius, radius, 0, 2 * Math.PI, false);
        this.window.context.fillStyle = this.color;
        this.window.context.fill();
        this.window.context.closePath();
    }

    public onUpdate(): void {
        this.decelerate();
        this.move();
    }

    public accelerate(direction: engine.Direction): void {
        if (direction === engine.Direction.Left || direction === engine.Direction.Right) return super.accelerate(direction);
        if (direction === engine.Direction.Up) this.velocity.y -= 1;
        // do nothing if down
    }
}
