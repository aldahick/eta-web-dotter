import GameWindow from "./GameWindow.js";

export default interface IGameEntity {
    window: GameWindow;
    shouldRemove: boolean;
    isAffectedByGravity: boolean;

    onUpdate(): void;
    onRender(context: CanvasRenderingContext2D): void;
}
