const dotenv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const fs = require('fs')
const port = process.env.PORT;
app.use(cors({
  origin: '*'
}))

require('./routes/LoginRoute.js')(app)
require('./routes/RegisterRoute')(app)
require('./routes/GetSaveRoute')(app)
require('./routes/MailSender')(app)
require('./routes/SaveRoute')(app)
require('./routes/PasswordChange')(app)
require('./routes/UpdateUserRoute')(app)
require('./routes/ListOnlineUsersRoute')(app)
require('./routes/GetSaveIDRoute')(app)
require('./routes/SaveRoute')(app)
require('./routes/GetAchievementsRoute')(app)
require('./routes/SetAchievementsRoute')(app)

module.exports = app

app.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}).listen(port, () => {
    console.log(`API: API is running on port: ${port}`)
})




