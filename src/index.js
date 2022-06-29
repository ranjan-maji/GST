const express = require('express');
require('./db/conn.js');
const allAli = require('./routers/allApis');


const app = express();
const port = process.env.PORT || 8000


app.use(express.json());
app.use(allAli);

app.listen(port, () => {
    console.log(`connecting is setup at ${port}`);
})