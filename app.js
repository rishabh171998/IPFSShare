const express =require('express');
const bodyParser = require('body-parser');
const fileUpload =require('express-fileupload');
const up=require('./routes/upload')
const app = express();
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use('/upload',fileUpload());
app.get('/',(req, res) => {
 res.render('home');
});
app.use('/upload',up);
app.listen(2039, () => {
  console.log('Server is listening on port 3000');
});
