import express from 'express';

const app = express();
const PORT = 1199;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`App is ready, listening on ${PORT}`);
});
