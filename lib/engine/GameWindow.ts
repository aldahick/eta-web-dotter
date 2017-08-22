import IGameEntity from "./IGameEntity.js";
import Vector2 from "./Vector2.js";

const EVENT_LOOP_INTERVAL = 25; // ms

export default class GameWindow {
    public readonly size: Vector2;
    public readonly entities: IGameEntity[] = [];

    public constructor(size: Vector2) {
        this.size = size;
    }

    public start(): void {
        setInterval(() => this.loop(), EVENT_LOOP_INTERVAL);
    }

    public addEntity(entity: IGameEntity): void {
        entity.window = this;
        this.entities.push(entity);
    }

    public getMiddle(): Vector2 {
        return new Vector2(this.size.x / 2, this.size.y / 2);
    }

    protected loop(): void {
        this.update();
    }

    protected update(): void {
        this.entities.forEach(e => e.onUpdate());
    }
}
