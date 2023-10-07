
const database = require("../config/database");
const bcrypt = require("bcrypt");

const validarEmail = (req, res) => {
    const { email } = req.body;
    // Consulta para buscar si el correo ya existe en la base de datos
    const checkEmailQuery = "SELECT * FROM usuario WHERE email = ?";
    database.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Error al verificar el correo" });
        }

        if (result.length > 0) {
            // El correo ya está registrado
            return res.status(409).send({ message: "El correo ya está registrado" });
        }

        // El correo no está registrado, se puede usar
        res.status(200).send({ message: "El correo está disponible" });
    });
};


// Controlador para registrar un nuevo usuario
const createUser = (req, res) => {
    const { nombre, email, telefono, pass } = req.body;
    
    // Genera un hash de la contraseña antes de almacenarla
    bcrypt.hash(pass, 10, (hashErr, hash) => {
        if (hashErr) {
            return res.status(500).send({ message: "Error al crear usuario" });
        }
        // Almacena el hash en la base de datos
        const createQuery = `INSERT INTO usuario(nombre,email,telefono,contraseña) VALUES(?, ?, ?, ?)`;
        const query = database.format(createQuery, [nombre, email, telefono, hash]);

        database.query(query, (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error al crear usuario" });
            }
            res.send({ message: 'Usuario creado' });
        });
    });
};

const loginUser = (req, res) => {
    const { email, pass } = req.body;
    // Consulta para buscar al usuario por su correo
    const query = "SELECT * FROM usuario WHERE email = ?";
    database.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Error al buscar el usuario" });
        }
        // Si no se encuentra un usuario con ese correo
        if (result.length === 0) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        const user = result[0];
        // Compara la contraseña ingresada con el hash almacenado
        bcrypt.compare(pass, user.contraseña, (bcryptErr, bcryptRes) => {
            if (bcryptErr) {
                return res.status(500).send({ message: "Error de autenticación" });
            }

            if (!bcryptRes) {
                return res.status(401).send({ message: "Contraseña incorrecta" });
            }

            // Genera un token JWT con el ID del usuario
            //const token = jwt.sign({ userId: user.id }, secretKey); // Cambia 'secretKey' por tu clave secreta

            res.status(200).json({ message: "Inicio de sesión exitoso" });
        });
    });
};



module.exports = {
    createUser,
    loginUser,
    validarEmail
};