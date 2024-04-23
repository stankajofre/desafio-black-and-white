import 'dotenv/config'
import express, { urlencoded } from 'express';
import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid'

const_dirname = import.meta.dirname;

const app = express();
const PORT = process.env.PORT || 3000;


app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log("estoy en la ruta principal")
});

app.post('/image', async (req, res) => {
    const image_url = req.query.image_url

    app.get('/image', async (req, res) => {
        const image = await Jimp.read(image_url)
        const buffer = await image

            .resize(350, AUTO) // Redimensionar a 350px de ancho
            .grayscale() // Convertir a escala de grises
            .quality(100) // Calidad de la imagen
            .write(`public/images/${uuidv4()}.jpg`); // Guardar la imagen procesada con un nombre único
            .getBufferAsync(Jimp.MIME_JPEG)

        const dirname = __dirname + `/public/img/image-${nanoid()}.jpeg`
        await image.writeAsync(dirname)

        res.set("Content-Type", "image/jpeg")
        return res.send(buffer)
    })


    app.listen(PORT, () => {
        console.log(`Servidor iniciado en http://localhost:${PORT}`);
    })
