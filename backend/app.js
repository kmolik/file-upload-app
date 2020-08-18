const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const cors = require('cors')

const app = express();
//app.use(express.static('public'));

app.use(cors())

//Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +
      path.extname(file.originalname));
  }
});

//Init upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function (req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

//Check file type

function  checkFileType(file, cb) {
  //allowed types
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime type
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname) {
    return  cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}



//EJS
app.set('view engine', 'ejs');

//Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload',  (req, res) => {
  upload(req, res, (err) => {
    console.log(JSON.parse(req.body));
    if(err) {
      res.render('index', {
        msg: err
      });
    } else {
      if(!!!req.file){
        res.render('index', {
          msg: 'Error: no file selected'
        });
      } else {
        res.render('index', {
          msg: 'File uploaded',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});


const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
