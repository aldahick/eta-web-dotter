export default class HelperColor {
    private static availableColors: string[] = ["#0000FF", "#800080", "#FF0000", "#FFA500"];
    private static lastColorIndex = -1;

    public static nextColor(): string {
        if (this.lastColorIndex === this.availableColors.length - 1) {
            this.lastColorIndex = 0;
        } else {
            this.lastColorIndex++;
        }
        return this.availableColors[this.lastColorIndex];
    }
}
