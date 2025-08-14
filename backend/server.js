const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ROTA: Listar professores
app.get('/professores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Professor');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ROTA: Criar professor
app.post('/professores', async (req, res) => {
  const { nome_professor, cpf_professor, email_professor, telefone_professor, idioma } = req.body;
  try {
    await pool.query(
      'INSERT INTO Professor (nome_professor, cpf_professor, email_professor, telefone_professor, idioma) VALUES ($1, $2, $3, $4, $5)',
      [nome_professor, cpf_professor, email_professor, telefone_professor, idioma]
    );
    res.status(201).send('Professor cadastrado com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ROTA: Atualizar professor
app.put('/professores/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_professor, cpf_professor, email_professor, telefone_professor, idioma } = req.body;
  try {
    await pool.query(
      'UPDATE Professor SET nome_professor=$1, cpf_professor=$2, email_professor=$3, telefone_professor=$4, idioma=$5 WHERE id_professor=$6',
      [nome_professor, cpf_professor, email_professor, telefone_professor, idioma, id]
    );
    res.send('Professor atualizado com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ROTA: Deletar professor
app.delete('/professores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Professor WHERE id_professor=$1', [id]);
    res.send('Professor deletado com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
