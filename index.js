const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')

app.set("view engine", "ejs")
app.use(express.static('ressources'))

//use for application/json for exemple POST /api/users gets JSON bodies
//app.use(bodyParser.json())

// create application/x-www-form-urlencoded parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file
        cb(null, originalname)
    }
})
const upload = multer({ storage: storage})



app.get('/', (req, res) => {
    res.render('index')
})


app.post('/upload', async (req, res) => {
    var uploaded = upload.single('uploaded_file')
    uploaded(req, res, (err) => {
        if(err) {
            res.send({status: 400, error: "error occured"})
            return;
        }

        res.send({status: 200, message: "Success"})
    })
   
  /*  try {
        await uploaded(req, res)
        res.status(200).send(req.file)
    } catch (e) {
        res.status(400).send("Error uploadind file")
    }*/
})



app.listen('8017', () => {
    console.log("app listen on port 8017")
})