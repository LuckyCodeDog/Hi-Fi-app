const express = require('express');
const app = express();
const port = 3000;
const sqlFn = require("./mysql")
const cors =require("cors")
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true, 
}));
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM WiFi_Routers'
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err)
            return
        }
        res.send({ code: '00000', records: data })
    })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
