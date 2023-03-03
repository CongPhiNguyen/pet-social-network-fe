import { Image } from 'antd';

export const imageShow = (src, theme) => {
    return (
        <Image src={src} alt="images"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)', width: "100%", height: "100%" }} />
    )
}

export const videoShow = (src, theme) => {
    return (
        <video controls src={src} alt="videos"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
    )
}