import Game from "dotter/game/Game.js";

$(document).ready(() => {
    const game: Game = new Game(<any>$("#canvas")[0]);
    game.start();
});
