const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hpback',
    password: 'ds564',
    port: 5432,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('A rota de teste esta funcionando!');
});

const verifyWand = ({length}) => {
    if (length < 15 || length > 35) {
        return false;
    }
    return true;
}

// witchers -----------------------------------------------------------------------------

app.get('/witchers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM witchers');
        if (result.rowCount === 0) {
            return res.status(404).send('Nenhum bruxo encontrado');
        }
        res.json({
            total: result.rowCount,
            witchers: result.rows,
        });
    } catch (error) {
        console.error('erro ao obter todos os bruxos', error);
        res.status(500).send('Erro ao obter os bruxos');
    }
});

app.get('/witchers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM witchers WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Bruxo não encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('erro ao obter bruxo', error);
        res.status(500).send('Erro ao obter o bruxo');
    }
});

app.post('/witchers', async (req, res) => {
    try {
        let bloods = ['puro', 'mestiço', 'trouxa'];
        const { name, age, hogwartsHouse, skill, bloodStatus, patrono } = req.body;
        if (!bloods.includes(bloodStatus)) {
            return res.status(400).send('Sangue inválido');
        }
        await pool.query('INSERT INTO witchers (name, age, hogwartsHouse, skill, bloodStatus, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [name, age, hogwartsHouse, skill, bloodStatus, patrono]);
        res.status(201).send({ mensagem: 'Bruxo criado com sucesso' });
    } catch (error) {
        console.error('erro ao inserir bruxo', error);
        res.status(500).send('Erro ao inserir os bruxos');
    }
});

app.delete('/witchers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('DELETE FROM witchers WHERE id = $1', [id]);
        if (response.rowCount === 0) {
            return res.status(404).send('Bruxo não encontrado');
        }
        res.status(200).send('Bruxo deletado com sucesso');
    } catch (error) {
        console.error('erro ao apagar bruxo', error);
        res.status(500).send('Erro ao apagar os bruxos');
    }
});

app.put('/witchers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let bloods = ['puro', 'mestiço', 'trouxa'];
        const { name, age, hogwartsHouse, skill, bloodStatus, patrono } = req.body;
        if (!bloods.includes(bloodStatus)) {
            return res.status(400).send('Sangue inválido');
        }
        const response = await pool.query('UPDATE witchers SET name = $1, age = $2, hogwartsHouse = $3, skill = $4, bloodStatus = $5, patrono = $6 WHERE id = $7', [name, age, hogwartsHouse, skill, bloodStatus, patrono, id]);
        if (response.rowCount === 0) {
            return res.status(404).send('Bruxo não encontrado');
        }
        res.status(200).send({ mensagem: 'Bruxo atualizado com sucesso' });
    } catch (error) {
        console.error('erro ao atualizar bruxo', error);
        res.status(500).send('Erro ao atualizar os bruxos');
    }
});

app.get('/witchers/name/:name', async (req, res) => {
    try {   
        const { name } = req.params;
        const result = await pool.query("SELECT * FROM witchers WHERE name = $1", [name]);
        if (result.rowCount === 0) {
            return res.status(404).send('Bruxo não encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('erro ao obter bruxo', error);
        res.status(500).send('Erro ao obter o bruxo');
    }
});

// wand -----------------------------------------------------------------------------

app.get('/wand', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wand');
        if (result.rowCount === 0) {
            return res.status(404).send('Nenhuma varinha encontrada');
        }
        res.json({
            total: result.rowCount,
            wand: result.rows,
        });
    } catch (error) {
        console.error('erro ao obter todas as varinhas', error);
        res.status(500).send('Erro ao obter as varinhas');
    }
});

app.get('/wand/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM wand WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Varinha não encontrada');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('erro ao obter varinha', error);
        res.status(500).send('Erro ao obter a varinha');
    }
});

app.post('/wand', async (req, res) => {
    try {
        const { material, length, core, manufacturingDate } = req.body;
        if (!verifyWand({length})) {
            return res.status(400).send('Tamanho de varinha inválido');
        }
        await pool.query('INSERT INTO wand (material, length, core, manufacturingDate) VALUES ($1, $2, $3, $4)', [material, length, core, manufacturingDate]);
        res.status(201).send({ mensagem: 'Varinha criada com sucesso' });
    } catch (error) {
        console.error('erro ao inserir varinha', error);
        res.status(500).send('Erro ao inserir as varinhas');
    }
});

app.delete('/wand/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('DELETE FROM wand WHERE id = $1', [id]);
        if (response.rowCount === 0) {
            return res.status(404).send('Varinha não encontrada');
        }
        res.status(200).send('Varinha deletada com sucesso');
    } catch (error) {
        console.error('erro ao apagar varinha', error);
        res.status(500).send('Erro ao apagar as varinhas');
    }
});

app.put('/wand/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, length, core, manufacturingDate } = req.body;
        const response = await pool.query('UPDATE wand SET material = $1, length = $2, core = $3, manufacturingDate = $4 WHERE id = $5', [material, length, core, manufacturingDate, id]);
        if (response.rowCount === 0) {
            return res.status(404).send('Varinha não encontrada');
        }
        res.status(200).send({ mensagem: 'Varinha atualizada com sucesso' });
    } catch (error) {
        console.error('erro ao atualizar varinha', error);
        res.status(500).send('Erro ao atualizar as varinhas');
    }
});

app.listen(PORT, () => {
    console.log(`O servidor esta rodando na porta ${PORT}`);
});