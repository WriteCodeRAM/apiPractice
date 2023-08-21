import express from 'express';

import { getNotes, getNote, createNote } from './database.js';
const app = express();
app.use(express.json());

//all notes
app.get('/notes', async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

//single note
app.get('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const notes = await getNote(id);
  res.send(notes);
});

app.post('/notes', async (req, res) => {
  const { title, contents } = req.body;
  const notes = await createNote(title, contents);
  res.status(201).send(notes);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('something broke :( ');
});

app.listen(8080, () => {
  console.log('server is running on port 8080');
});
