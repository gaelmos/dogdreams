import usuario from './fechas.js'
import cors from 'cors'
import express from 'express';
import { client } from './dbconfig.js';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'; 
import crypto from 'crypto';
const app = express();
const port = 3000;
const claveSecreta = crypto.randomBytes(64).toString('hex'); 

app.use(cors({origin: '*', credentials: true}));
app.use(express.json());
app.listen(port, () => { console.log(' el servidor esta corriendo en port', {port}); })

app.post("/usuario",async (req, res) => {
    try{
        const hashed = await bcryptjs.hash( req.body.contraseña,10)
    const nuevousuario = await usuario.createusuario(req.body.nombre, req.body.mail, parseInt(dni), req.body.numero, req.body.direccion, hashed, req.body.foto)
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
        console.log(err);
        }
}  
});
app.post("/inicio", async (req, res) =>{
        const { mail, contraseña } = req.body;
        try {
            // Obtener el hash almacenado en la base de datos
            const queryinicio = "SELECT contraseña FROM usuario WHERE mail = $1";
            const resulta1 = await client.query(queryinicio, [mail]);
    
            if (resulta1.rows.length === 1) {
                const usuario = resulta1.rows[0];
                const storedHash = usuario.contraseña;
                const contracompa = await bcryptjs.compare(contraseña, storedHash);
    
                if (contracompa) {
                    // Crear el token JWT
                    const token = jwt.sign(
                        { id: usuario.id, mail: usuario.mail }, 
                        claveSecreta, 
                        { expiresIn: '72h' } // Expiración del token (1 hora)
                    );
    
                    console.log("Token generado: ", token);
                    res.status(200).json({ message: "Has iniciado sesión correctamente", token });
                } else {
                    res.status(401).send("Contraseña incorrecta, intenta de nuevo");
                }
            } else {
                res.status(401).send("No se ha encontrado un usuario con ese mail");
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
 });

      
