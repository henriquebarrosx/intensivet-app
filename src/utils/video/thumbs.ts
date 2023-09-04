import * as VideoThumbnails from 'expo-video-thumbnails'

type VideoConfig = VideoThumbnails.VideoThumbnailsOptions

export const generateThumbnail = async (source: string): Promise<string | undefined> => {
    try {
        const config: VideoConfig = { time: 2000, quality: 0.1 }
        const { uri } = await VideoThumbnails.getThumbnailAsync(source, config)
        return uri
    }

    catch (error) {
        console.error("Not possible to generate a video preview", error)
    }
}