const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors());
const port = 4242


require('./routes/account.routes')(app);


   mongoose.connect(process.env.DATABASE_URL)
   .then(() => console.log('Connected to Database'))
   .catch((error) => console.error('Database connection error:', error));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})