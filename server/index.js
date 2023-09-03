const express = require('express');
const app = express();
const port = 3030;
const sqlFn = require("./mysql")
const cors = require("cors")
app.use(cors())
function customReplacer(key, value) {
    if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
    }
    return value;
}
app.get('/api', (req, res) => {
    const sql = 'SELECT * FROM WiFi_Routers'
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err)
            return
        }
        newWifiList = data.map((wifi) => {
            const { latitude, longitude, ...newList } = wifi
            newList.coordinate = { latitude, longitude }
            return newList
        })
        console.log(newWifiList)
   
       

        // 将数据转换为 JSON 字符串，使用自定义 replacer 函数
        const jsonString = JSON.stringify(newWifiList, customReplacer); // 第三个参数用于美化输出

        console.log(jsonString);
        res.send({ code: '00000', records: jsonString })
    })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
