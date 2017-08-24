/**
 * Intervals are measured in milliseconds unless otherwise noted.
 */
export default class Constants {
    public static acceleration = 0.5;
    // (g = -9.8 m/s^2 = -9.8/40 m/25ms^2 = -0.245 meters / 25 ms^2 = -0.0245 pixels / 25 ms^2)
    public static gravity = -0.5;
    public static eventLoopInterval = 25;

    public static bulletDiameter = 4;
    public static bulletVelocity = 20;

    public static dotWidth = 32;
    public static dotHeight = 64;

    public static floorHeight = 128;

    public static playerFireInterval = 500;
    public static playerJumpInterval = 600;
}
