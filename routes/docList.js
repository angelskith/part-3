const express = require('express');
const router = express.Router();
const multer = require('multer');
var path = require('path');
require('../db/db');

const Upload = require('../models/Upload');

router.get('/docList', (req,res) => {
    Upload.find({})
    .then(files => {
        res.render('docList', {files : files});
        
    })
})

let storage = multer.diskStorage({
    destination: "./public/files",
    filename : (req, file, cb) => {
        cb(null, file.originalname) 
    }
})

let upload = multer({ 
    storage : storage,
    fileFilter : (req, file, cb) => {
        checkFileType(file, cb); // the parameter upload will take this to check the file
    }
})

function checkFileType(file, cb) { // function to check and limit the extensions that allows to upload
    const fileTypes = /pdf|docx|xls/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if(extname) {
        return cb(null, true);
    }else {
        cb('error: documents file only');
    }
}

router.post('/docList', upload.single('uploadFile'), (req, res, next) => {
    const file = req.file;
   
    if(!file) {
        return console.log('Please select file');
    }

    let url = file.path.replace('public','');
 
     Upload.findOne({filename : url} )
    .then( file => {
        if( file ) {
            console.log('File already exist')
            return res.redirect('/docList')
        }

       Upload.create({
        filelabel : req.body.filelabel,
        filename : url })
        .then(file => {
            console.log('File saved');
            res.redirect('/docList') // need the file to be downloadable
          
        })
    })

})

module.exports = router;