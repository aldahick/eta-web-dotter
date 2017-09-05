import GameWindow from "../GameWindow";
import IGameObject from "../IGameObject";
import VelocityRectangle from "../shapes/VelocityRectangle";

export default abstract class Entity extends VelocityRectangle implements IGameObject {
    public window: GameWindow;
    public shouldRemove = false;
    public readonly isAffectedByGravity: boolean = true;
    public onSurface = false;
    public abstract onUpdate(): void;
    public abstract onRender(context: CanvasRenderingContext2D): void;
}
