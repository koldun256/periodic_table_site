const express = require('express');
const app = express();
const textDecoder = require('windows-1251');
const elements_data = require('./elements_data');
const http = require('http').createServer(app);
const path= require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const MENU = '/';
function generateElementNumber(req_id){
    let id = (parseInt(req_id)+1)+"";
    return id.length==1?'00'+id:(id.length==2?'0'+id:id);
}
app.use(express.static('public'));
app.set('view engine','ejs');
/*app.get(MENU,(req,res)=>{
    console.log(req.headers.host);
    res.render('menu',{ elements: elements_data,
                        element_url: 'http://'+req.headers.host+'/element/' });
});*/
app.get('/element/:id',(req, res)=>{
    let number = parseInt(req.params['id']);
    let folder = elements_data[number];
    console.log(folder);
    let element = JSON.parse(fs.readFileSync(path.join( 'public',
                                                        'elements',
                                                        folder,
                                                        'strings.json' )));

    let texts = [textDecoder.decode(fs.readFileSync(path.join('public',
                                            'elements',
                                            folder,
                                            'text1.txt'),'binary')),
                textDecoder.decode(fs.readFileSync(path.join(  'public',
                                            'elements',
                                            folder,
                                            'text2.txt'),'binary')),
                textDecoder.decode(fs.readFileSync(path.join(  'public',
                                            'elements',
                                            folder,
                                            'text3.txt'),'binary'))];
    element.texts = texts;
    element.letters = folder;
    element.number = generateElementNumber(req.params['id']);
    res.render('element',{  element: element,
                            menulocation: 'http://'+req.headers.host+MENU });
});
http.listen(PORT,()=>console.log(`listening on port ${PORT}`));
