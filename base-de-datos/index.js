import usuario from './fechas.js'
import cors from 'cors'
import express from 'express';
import { client } from './dbconfig.js';
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
    if (err.message.includes('DNI ya está en uso')) {
        res.status(400).json({ error: 'El DNI ya está en uso, pruebe con otra.' });
    } else if (err.message.includes('mail ya está en uso, pruebe con otra')) {
        res.status(400).json({ error: 'El mail ya está en uso, pruebe con otra.' });
    } else if (err.message.includes('telefono ya está en uso, pruebe con otra')) {
        res.status(400).json({ error: 'telefono ya está en uso, pruebe con otra.' });
    } else if (err.message.includes('contraseña ya está en uso, pruebe con otra')) {
        res.status(400).json({ error: 'La contraseña ya está en uso, pruebe con otra.' });
    } else {
        res.status(500).json({ error: 'Error al crear el usuario.' });
        }
}  
});
app.post("/inicio", async (req, res) =>{
    console.log(req.body);
    const{mail,contraseña} = req.body;
    try{
        const queryinicio = "SELECT * from usuario WHERE mail = $1 AND contraseña = $2";
        const resulta1 = await client.query(queryinicio, [mail, contraseña]);
        if(resulta1.rows.length > 0) {
            res.status(200).send("has iniciado sesion correctamente");
        } else{
            res.status(401).send("no has podido iniciar sesion, intenta de nuevo");
        }
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesion ' });
    }
})