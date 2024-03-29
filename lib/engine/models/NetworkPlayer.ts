import Direction from "../Direction";
import Vector2 from "../Vector2";

export default interface NetworkPlayer {
    color: string;
    id: string;
    position: Vector2;
    direction: Direction;
}
