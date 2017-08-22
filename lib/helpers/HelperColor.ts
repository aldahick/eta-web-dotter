export default class HelperColor {
    private static availableColors: string[] = ["blue", "purple", "red", "orange", "black"];
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
