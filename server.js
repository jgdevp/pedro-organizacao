const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = 'progress.json';

app.use(express.json());
app.use(cors());

// Carregar progresso
app.get('/progress', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo' });
        }
        try {
            const progress = JSON.parse(data);
            res.json(progress);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao processar o JSON' });
        }
    });
});

// Atualizar progresso
app.post('/progress', (req, res) => {
    try {
        const progress = req.body;
        if (typeof progress !== 'object' || progress === null) {
            return res.status(400).json({ error: 'Formato inválido de dados' });
        }
        fs.writeFile(DATA_FILE, JSON.stringify(progress, null, 4), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao salvar o arquivo' });
            }
            res.json({ message: 'Progresso atualizado' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
