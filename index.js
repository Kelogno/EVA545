const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

let storage = ""; // Almacenamiento en memoria para los mensajes.

// Rutas
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === '23' && password === '3745') {
        res.json({ role: 'writer', message: 'Login exitoso, puedes escribir mensajes.' });
    } else if (username === '25' && password === '5155') {
        res.json({ role: 'reader', message: 'Login exitoso, puedes leer mensajes.' });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas.' });
    }
});

app.post('/write', (req, res) => {
    const { username, password, message } = req.body;

    if (username === '23' && password === '3745') {
        storage = message;
        res.json({ message: 'Mensaje guardado exitosamente.' });
    } else {
        res.status(403).json({ error: 'No tienes permiso para escribir.' });
    }
});

app.get('/read', (req, res) => {
    const { username, password } = req.query;

    if (username === '25' && password === '5155') {
        res.json({ message: storage });
    } else {
        res.status(403).json({ error: 'No tienes permiso para leer.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
