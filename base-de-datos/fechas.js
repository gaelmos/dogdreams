import {client} from './dbconfig.js'
const createusuario = async (nombre, mail, dni) => {
    const query = 'INSERT INTO usuario (nombre, mail, dni) VALUES ($1, $2, $3) RETURNING *';
    const values = [nombre, mail, parseInt(dni)];
        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (err) {
            console.error('Error al insertar el usuario:', err);
            throw err; 
        }
};

const usuario = {
   createusuario,
};

export default usuario;
