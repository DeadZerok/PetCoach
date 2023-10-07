const database = require("../config/database");


const createPet = (req, res) => {
     // Obtiene el ID del usuario logeado a través del token
    //const userId = req.userId;
    // Obtener los datos del objeto desde el cuerpo de la solicitud
    const { nombre, especie, raza, edad} = req.body;

    // Consulta SQL para insertar un nuevo objeto asociado al usuario
    const insertQuery = `INSERT INTO mascota (nombre, especie, raza, edad) VALUES ( ?, ?, ?, ?)`;
    const query = database.format(insertQuery, [nombre, especie, raza, edad]);

    database.query(query, (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Error al agregar mascota" });
        }
        res.send({ message: 'Mascota agregada con éxito' });
    });
};


module.exports = {
    createPet,
};