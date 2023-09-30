import { logger } from "../../infra/adapters/logger-adapter"

export class DeviceFile {
    private constructor(
        readonly id: number,
        readonly name: string,
        readonly type: string,
        readonly uri: string,
        readonly kind: "image" | "audio" | "file" | "video",
        readonly preview: string
    ) { }

    static create({ mimeType, type, uri, name, id = Math.random(), preview = "" }: Input) {
        if (!uri) {
            logger.error("DEVICE FILE", "Device file must to have URI")
            throw new Error("Device file must to have URI")
        }
        const fileType = mimeType ?? DeviceFile.extractMimeTypeFromURI(uri, type)
        const fileName = name || new Date().toISOString()
        return new DeviceFile(id, fileName, fileType, uri, type, preview)
    }

    private static extractMimeTypeFromURI(uri: string, type: string) {
        if (!["image", "video", "file", "audio"].includes(type)) {
            logger.error("DEVICE FILE", "Invalid file type")
            throw new Error("Invalid file type")
        }
        return `${type}/${uri.match(/\.([^.]+)$/)[1]}`
    }
}

type Input = {
    id?: number
    uri: string
    name?: string
    preview?: string
    mimeType?: string
    type: "image" | "video" | "file" | "audio"
}