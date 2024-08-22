import {client} from './dbconfig.js'
const createusuario = async (nombre, mail, dni, numero, direccion, contraseña, foto) => {
    const query = 'INSERT INTO usuario (nombre, mail, dni, numero, direccion, contraseña, foto) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [nombre, mail, parseInt(dni), numero, direccion, contraseña, foto];
        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (err) {
            console.error('Error al insertar el usuario:', err);
            throw err; 
        }
};
const crateperro = async (id, nombre, raza, descripcion, foto, color, nacimiento, tamaño, dificultades) => {
    const query = 'INSERT INTO perro (id, nombre, raza, descripcion, foto, color, nacimiento, tamaño, dificultades) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const values = [id, nombre, raza, descripcion, foto, color, nacimiento, tamaño, dificultades];
        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (err) {
            console.error('Error al insertar el perro:', err);
            throw err; 
        }
};

const usuario = {
   createusuario,
};

export default usuario;
