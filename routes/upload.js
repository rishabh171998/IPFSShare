const router=require('express').Router();
const FileHandling=require('../FileHandling/addFile');
const bodyParser = require('body-parser');
const mailer=require('../Mailer/mail');
router.use(bodyParser.urlencoded({extended : true}));
const fs=require('fs');
router.post('/',(req, res) => {
    const file = req.files.UploadedFile;
    const fileName = req.body.fileName
    const filePath = 'files/' + fileName;
    file.mv(filePath , async(err) => {
        if(err){
          console.log('Error: failed to download the file');
          return res.status(500).send(err);
        }
        const fileHash = await FileHandling.addFile(fileName , filePath);
        console.log(fileHash);
        fs.unlink(filePath ,(err) => {
           if(err) console.log(err);
        });
        mailer.mail(fileHash).catch();
        res.render('upload',{fileName, fileHash});
     });
  });
  module.exports=router;