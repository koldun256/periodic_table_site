const express = require('express');
const app = express();
const elements_data = require('./elements_data');
const http = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const MENU = '/';
app.use(express.static('public'));
app.set('view engine','ejs');
app.get(MENU,(req,res)=>{
    console.log(req.headers.host);
    res.render('menu',{elements: elements_data,element_url: 'http://'+req.headers.host+'/element/'});
});
app.get('/element/:id',(req, res)=>{
    res.render('element',{element: elements_data[parseInt(req.params['id'])],
                        menuLocation: 'http://'+req.headers.host+MENU});
});
http.listen(PORT,()=>console.log(`listening on port ${PORT}`));