import Game from "dotter/game/Game.js";

$(document).ready(() => {
    new Game(<any>$("#canvas")[0]).start();
});
