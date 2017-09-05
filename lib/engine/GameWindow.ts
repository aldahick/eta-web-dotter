import Constants from "./Constants";
import Entity from "./entities/Entity";
import Vector2 from "./Vector2";

export default class GameWindow {
    public readonly size: Vector2;
    public readonly entities: Entity[] = [];

    public constructor(size: Vector2) {
        this.size = size;
    }

    public start(): void {
        setInterval(() => this.loop(), Constants.eventLoopInterval);
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
        const indexesToRemove: number[] = [];
        this.entities.forEach((e, i) => {
            e.onUpdate();
            if (e.shouldRemove) {
                indexesToRemove.push(i);
            }
        });
        indexesToRemove.forEach((k, i) => {
            this.entities.splice(k - i, 1);
        });
    }
}
