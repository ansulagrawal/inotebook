const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// app.get('/', (req, res) => {
//    res.send('Hello Ansul!')
// })

app.listen(PORT, () => {
   console.log(`iNotebook backend listening at http://localhost:${PORT}`);
});
