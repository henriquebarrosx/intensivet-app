export class DeviceFile {
    private constructor(
        readonly name: string,
        readonly type: string,
        readonly uri: string,
        readonly kind: "image" | "audio" | "file" | "video"
    ) { }

    static create({ name = new Date().toISOString(), mimeType, type, uri }: Input) {
        if (!uri) throw new Error("Device file must to have URI")
        const fileType = mimeType ?? DeviceFile.extractMimeTypeFromURI(uri, type)
        return new DeviceFile(name, fileType, uri, type)
    }

    private static extractMimeTypeFromURI(uri: string, type: string) {
        if (!["image", "video", "file", "audio"].includes(type)) throw new Error("Invalid file type")
        return `${type}/${uri.match(/\.([^.]+)$/)[1]}`
    }
}

type Input = {
    uri: string
    name?: string
    mimeType?: string
    type: "image" | "video" | "file" | "audio"
}