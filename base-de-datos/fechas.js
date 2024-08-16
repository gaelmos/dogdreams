import {config} from './dbconfig.js'
const createusuario = async (nombre, mail, dni) => {
        try {
            const [results, fields] = await config.query(
                'INSERT INTO `usuario` (nombre, mail, dni) VALUES (?, ?, ?)',
                [nombre, mail, dni]
            );
            return (results[0]);
        } catch (err) {
            console.log(err);
        }
};

const usuario = {
   createusuario,
};

export default usuario;
