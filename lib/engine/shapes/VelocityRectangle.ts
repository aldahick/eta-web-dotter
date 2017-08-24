import Constants from "../Constants.js";
import Direction from "../Direction.js";
import Rectangle from "./Rectangle.js";
import Vector2 from "../Vector2.js";

export default abstract class VelocityRectangle extends Rectangle {
    public velocity: Vector2 = new Vector2(0, 0);

    public accelerate(direction: Direction): void {
        switch (direction) {
            case Direction.Up:
                this.velocity.y += Constants.accelerationConstant; break;
            case Direction.Down:
                this.velocity.y -= Constants.accelerationConstant; break;
            case Direction.Left:
                this.velocity.x -= Constants.accelerationConstant; break;
            case Direction.Right:
                this.velocity.x += Constants.accelerationConstant; break;
        }
    }

    public decelerate(): void {
        this.velocity = this.velocity.toZero(Constants.accelerationConstant / 4);
    }

    public move(): void {
        this.position = this.position.add(this.velocity);
    }

    /** Returns true if this object was stopped */
    public checkBoundaries(max: Vector2, min: Vector2 = new Vector2(0, 0)): boolean {
        // TODO: This is gross, not sure how to refactor to be pretty
        let isStopped = false;
        if (this.position.x < min.x) {
            this.position.x = min.x;
            if (this.velocity.x < 0) {
                this.velocity.x = 0;
            }
            isStopped = true;
        } else if (this.position.x > max.x - this.size.x) {
            this.position.x = max.x - this.size.x;
            if (this.velocity.x > 0) {
                this.velocity.x = 0;
            }
            isStopped = true;
        }
        if (this.position.y < min.y) {
            this.position.y = min.y;
            if (this.velocity.y < 0) {
                this.velocity.y = 0;
            }
            isStopped = true;
        } else if (this.position.y > max.y - this.size.y) {
            this.position.y = max.y - this.size.y;
            if (this.velocity.y > 0) {
                this.velocity.y = 0;
            }
            isStopped = true;
        }
        return isStopped;
    }
}
