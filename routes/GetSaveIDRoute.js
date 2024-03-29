const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWTKEY
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = app => {
    app.post('/api/getsaveid', urlencodedParser, async (req, res) => {
        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            const bearerToken = bearerHeader.split(' ')[1]
            const verified = jwt.verify(bearerToken, jwtKey)
            if (verified) {
                const userSave = await prisma.saves.findFirst({
                    where:
                    {
                        Users:
                        {
                            username: req.body.username
                        }
                    },
                    select: {
                        id: true
                    }
                }) 
                return res.json({userSave}, 200)
            }else{
                return res.json({ message: 'Unauthorized!' }, 401)
            }
        }
        else {
            return res.json({ message: 'Unauthorized!' }, 401)
        }

    })

}