import GameWindow from "./GameWindow.js";

export default interface IGameEntity {
    window: GameWindow;
    onUpdate(): void;
    onRender(context: CanvasRenderingContext2D): void;
}
