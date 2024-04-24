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
        const { name, age, hogwartsHouse, skill, bloodStatus, patrono } = req.body;
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
        await pool.query('DELETE FROM witchers WHERE id = $1', [id]);
        res.status(200).send('Bruxo deletado com sucesso');
    } catch (error) {
        console.error('erro ao apagar bruxo', error);
        res.status(500).send('Erro ao apagar os bruxos');
    }
});

app.put('/witchers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, hogwartsHouse, skill, bloodStatus, patrono } = req.body;
        await pool.query('UPDATE witchers SET name = $1, age = $2, hogwartsHouse = $3, skill = $4, bloodStatus = $5, patrono = $6 WHERE id = $7', [name, age, hogwartsHouse, skill, bloodStatus, patrono, id]);
        res.status(200).send({ mensagem: 'Bruxo atualizado com sucesso' });
    } catch (error) {
        console.error('erro ao atualizar bruxo', error);
        res.status(500).send('Erro ao atualizar os bruxos');
    }
});

app.listen(PORT, () => {
    console.log(`O servidor esta rodando na porta ${PORT}`);
});