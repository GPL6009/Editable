var express     = require('express');
var bodyParser  = require('body-parser');
var fs          = require('fs');
const path = require('path');

var app = express();

//app.set('view engine','ejs');
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended:true,limit:'50mb',parameterLimit:50000}));

app.use('/jquery',express.static(__dirname+'/node_modules/jquery/dist/'));

app.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname,'..','views','register.html'))
    res.sendFile(path.join(__dirname,'views','register.html'))
    //res.sendFile(('register.html'))
    //res.render('register.html');
});

app.post('/upload',(req,res)=>{
   var path     = __dirname+'/'+req.body.filename;
   var fname    = req.body.name;
   var image    = req.body.file;
   var data     = image.split(',')[1];
   fs.writeFileSync(path,data,{encoding:'base64'});
    var temp        = fs.readFileSync(path);
    var buff        = new Buffer(temp);
    var base64data  = buff.toString('base64');
    res.json({msg:'success',data:base64data,fname:fname});
});

var port  = process.env.port || 5000;
app.listen(port,()=>console.log('server run at port '+port));
