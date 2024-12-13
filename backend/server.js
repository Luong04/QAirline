require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/sequelize');

const app = express();

const port = process.env.PORT || 8888;

const configviewEngine = require('./src/config/viewEngine');

const apiRoutes = require('./src/routes/api');

const sessionMiddleware = require('./src/config/sessionConfig');

configviewEngine(app);

//config req.body
app.use(cors());
app.use(express.json()); // for from json
app.use(express.urlencoded({ extended: true})); // for from data

app.use(sessionMiddleware);

sequelize.authenticate()
    .then(() => {
        console.log('Connection to MySQL has been established successfully.');
        return sequelize.sync();  // Đồng bộ hóa mô hình với cơ sở dữ liệu
    })
    .then(() => console.log('All models were synchronized successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

//app.use('/', webRoutes);
app.use('/api/', apiRoutes);
app.listen(port, () => {
  console.log(`QAirline listening on port ${port}`)
})

