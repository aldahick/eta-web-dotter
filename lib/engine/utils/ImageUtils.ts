export default class ImageUtils {
    public static toBase64(svg: SVGElement): string {
        return "data:image/svg+xml;base64," + btoa(new XMLSerializer().serializeToString(svg));
    }
}
