import GameWindow from "../GameWindow";
import IGameObject from "../IGameObject";
import VelocityRectangle from "../shapes/VelocityRectangle";

export default class Entity extends VelocityRectangle implements IGameObject {
    public window: GameWindow;
    public shouldRemove = false;
    public readonly isAffectedByGravity = true;
    public onSurface = false;
}
