const express = require('express');
const app = express();
const port = 3000; // 您可以选择任意未被占用的端口号
const sqlFn = require("./mysql")
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
