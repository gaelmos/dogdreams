import usuario from './fechas.js'
import cors from 'cors'
import express from 'express';
const app = express();
const port = 3000;
app.use(cors({origin: '*', credentials: true}));
app.use(cors()); app.use(express.json());
app.listen(port, () => { console.log(' el servidor esta corriendo en porto', {port}); })

app.post("/usuario",async (req, res) => {
    const nuevousuario = await usuario.createusuario(req.body.nombre, req.body.mail, req.body.dni)
    res.json(nuevousuario);

});