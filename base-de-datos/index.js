import usuario from './fechas.js'
import cors from 'cors'
import express from 'express';
const app = express();
const port = 3000;
app.use(cors({origin: '*', credentials: true}));
app.use(express.json());
app.listen(port, () => { console.log(' el servidor esta corriendo en port', {port}); })

app.post("/usuario",async (req, res) => {
    try{
    const nuevousuario = await usuario.createusuario(req.body.nombre, req.body.mail, req.body.dni, req.body.numero, req.body.direccion, req.body.contraseña, req.body.foto)
    res.json(nuevousuario);
     
} catch (err) {
        console.error('Error en /usuario:', err);
        res.status(500).json({ error: 'Error al crear el usuario.' });

}  
});