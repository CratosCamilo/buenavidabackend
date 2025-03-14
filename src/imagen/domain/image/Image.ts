import AbstractImage, { ImageInterface } from "./AbstractImage";

export default class Image extends AbstractImage {
    constructor(imageInterface: ImageInterface) {
        super(imageInterface);
    }

    public isNull = (): boolean => false;
}
