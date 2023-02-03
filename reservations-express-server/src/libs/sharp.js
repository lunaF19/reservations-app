import sharp from "sharp"


export const helperImage = ({ filePath, fileName, x_size, y_size }) => {
    
    return sharp(`${filePath}\\${fileName}`)
        .resize(x_size, y_size)
        .toFile(`${filePath}\\sharp__${fileName}`)
}