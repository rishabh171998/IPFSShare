const express =require('express');
const bodyParser = require('body-parser');
const fileUpload =require('express-fileupload');
const up=require('./routes/upload')
/*const Bitswap = require('ipfs-bitswap')
const stat =Bitswap.stat();
const stats=require('./Stats/stat');*/
const app = express();
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended : true}));//MiddleWare(Function Work Request And ReS//Req Body)
app.use('/upload',fileUpload());
app.get('/',(req, res) => {
 res.render('home');
});
//stats.Stats(stat);
app.use('/upload',up);
app.listen(2039, () => {
  console.log('Server is listening on port 3000');
});