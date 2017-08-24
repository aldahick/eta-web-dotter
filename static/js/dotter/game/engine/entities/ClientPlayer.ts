import * as engine from "dotter/engine.js";
import ClientWindow from "dotter/game/engine/ClientWindow.js";

export default class ClientPlayer extends engine.Player {
    public window: ClientWindow;
    public leftImage: HTMLImageElement;
    public rightImage: HTMLImageElement;
    public shouldFaceLeft = false;
    public isActualPlayer = false;

    public constructor(position: engine.Vector2, color: string, direction: engine.Direction, id: string) {
        super(position, color, direction, id);
        // setup avatar
        this.leftImage = document.createElement("img");
        this.rightImage = document.createElement("img");
        const $image = $("#image-player").clone();
        $image.find(".body").css("fill", this.color);
        const complimentaryColor: string = "#" + ("000000" + (0xffffff ^ parseInt(this.color.substr(1), 16)).toString(16)).slice(-6);
        $image.find(".visor").css("fill", complimentaryColor);
        this.rightImage.src = engine.ImageUtils.toBase64(<any>$image[0]);
        $image.find(".visor").attr({
            "x": 0
        });
        this.leftImage.src = engine.ImageUtils.toBase64(<any>$image[0]);
    }

    public onUpdate(): void {
        super.onUpdate();
        if (!this.isActualPlayer) return;
        if (this.isKeyPressed(JQuery.Key.ArrowUp) || this.isKeyPressed(JQuery.Key.W)) {
            this.jump();
        } else {
            this.jumpStart = undefined;
        }
        if (this.isKeyPressed(JQuery.Key.ArrowRight) || this.isKeyPressed(JQuery.Key.D)) {
            this.accelerate(engine.Direction.Right);
            this.emit("accelerate", engine.Direction.Right);
        }
        if (this.isKeyPressed(JQuery.Key.ArrowLeft) || this.isKeyPressed(JQuery.Key.A)) {
            this.accelerate(engine.Direction.Left);
            this.emit("accelerate", engine.Direction.Left);
        } // ignore down arrow
        if (this.isKeyPressed(JQuery.Key.F)) {
            this.fire();
            this.emit("fire");
        }
        this.checkBoundaries(this.window.size);
    }

    public accelerate(direction: engine.Direction): void {
        super.accelerate(direction);
        if (direction === engine.Direction.Left || direction === engine.Direction.Right) {
            this.shouldFaceLeft = direction === engine.Direction.Left;
        }
    }

    private isKeyPressed(key: JQuery.Key) {
        return !!this.window.keysPressed[key];
    }

    public render(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.createImageData;
        context.drawImage(this.shouldFaceLeft ? this.leftImage : this.rightImage, this.position.x, this.position.y);
        context.closePath();
    }
}
