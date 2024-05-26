const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const agendaDir = path.join(__dirname, './agenda');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/event', (req, res) => {
    const { date, time, title, description } = req.body;
    const eventDir = path.join(agendaDir, date);
    const eventFile = path.join(eventDir, `${time}.txt`);

    if (!fs.existsSync(eventDir)) {
        fs.mkdirSync(eventDir, { recursive: true });
    }

    if (fs.existsSync(eventFile)) {
        return res.status(400).json({ message: 'Evento ya existe' });
    }

    const eventContent = `${title}\n${description}`;
    fs.writeFileSync(eventFile, eventContent, 'utf8');
    res.status(201).json({ message: 'Evento creado' });
});

app.put('/event', (req, res) => {
    const { date, time, title, description } = req.body;
    const eventFile = path.join(agendaDir, date, `${time}.txt`);

    if (!fs.existsSync(eventFile)) {
        return res.status(404).json({ message: 'Evento no encontrado' });
    }

    const eventContent = `${title}\n${description}`;
    fs.writeFileSync(eventFile, eventContent, 'utf8');
    res.status(200).json({ message: 'Evento editado' });
});

app.delete('/event', (req, res) => {
    const { date, time } = req.body;
    const eventFile = path.join(agendaDir, date, `${time}.txt`);

    if (!fs.existsSync(eventFile)) {
        return res.status(404).json({ message: 'Evento no encontrado' });
    }

    fs.unlinkSync(eventFile);
    res.status(200).json({ message: 'Evento eliminado' });
});

app.get('/events', (req, res) => {
    if (!fs.existsSync(agendaDir)) {
        return res.status(200).json({ events: [] });
    }

    const events = [];

    fs.readdirSync(agendaDir).forEach(dateDir => {
        const datePath = path.join(agendaDir, dateDir);
        if (fs.statSync(datePath).isDirectory()) {
            fs.readdirSync(datePath).forEach(eventFile => {
                const eventPath = path.join(datePath, eventFile);
                const [time] = eventFile.split('.txt');
                const [title, ...descriptionArray] = fs.readFileSync(eventPath, 'utf8').split('\n');
                const description = descriptionArray.join('\n');
                events.push({ date: dateDir, time, title, description });
            });
        }
    });

    res.status(200).json({ events });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
