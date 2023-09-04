export class DeviceFile {
    private constructor(
        readonly name: string,
        readonly type: string,
        readonly uri: string,
    ) { }

    static create(name: string | null | undefined, type: string = "", uri: string) {
        if (!["image", "video"].includes(type)) throw new Error(`Incompatible device type file. Provided type: ${type}`)
        const fileName = name ?? new Date().toISOString()
        return new DeviceFile(fileName, type, uri)
    }
}