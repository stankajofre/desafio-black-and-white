import express, { urlencoded } from 'express';
import Jimp from 'jimp';
import { nanoid } from 'nanoid'

const _dirname = import.meta.dirname;
const app = express()

app.use(express.static(_dirname + '/public'))

app.get('/image', async (req, res) => {

    req.query
    const image = await Jimp.read(`https://picsum.photos/1000`)

    const image = await Jimp.read(image_url)
    const buffer = await image
        .resize(500, 500)
        .grayscale()
        .quality(60)
        .getBufferAsync(Jimp.MIME_JPEG)

    const dirname = __dirname + `/public/img/image-${nanoid()}.jpeg`
    await image.writeAsync(dirname)

    res.set("Content-Type", "image/jpeg")
    return res.send(buffer)

})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
    console.log(process.pid)

})
