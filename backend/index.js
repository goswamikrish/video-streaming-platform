const connectMongo = require('./db');
var cors = require('cors')
connectMongo();
const express = require('express')
const app = express()
const port = 5000


app.use(cors())
app.use(express.json());
//availabe routes
app.use('/api/note',require('./routes/note'))
app.use('/api/auto',require('./routes/auto'))



app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})