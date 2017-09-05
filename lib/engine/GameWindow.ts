import Constants from "./Constants";
import Entity from "./entities/Entity";
import IGameObject from "./IGameObject";
import Vector2 from "./Vector2";

export default class GameWindow {
    public readonly size: Vector2;
    public readonly objects: IGameObject[] = [];

    public constructor(size: Vector2) {
        this.size = size;
    }

    public start(): void {
        setInterval(() => this.loop(), Constants.eventLoopInterval);
    }

    public addObject(object: IGameObject): void {
        object.window = this;
        this.objects.push(object);
    }

    public getMiddle(): Vector2 {
        return new Vector2(this.size.x / 2, this.size.y / 2);
    }

    protected loop(): void {
        this.update();
    }

    protected update(): void {
        const indexesToRemove: number[] = [];
        this.objects.forEach((e, i) => {
            e.onUpdate();
            if (e.shouldRemove) {
                indexesToRemove.push(i);
            }
        });
        indexesToRemove.forEach((k, i) => {
            this.objects.splice(k - i, 1);
        });
    }
}
