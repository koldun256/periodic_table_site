const express = require('express');
const app = express();
const elements_data = require('./elements_data');
const http = require('http').createServer(app);
const path= require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const MENU = '/';
app.use(express.static('public'));
app.set('view engine','ejs');
app.get(MENU,(req,res)=>{
    console.log(req.headers.host);
    res.render('menu',{elements: elements_data,element_url: 'http://'+req.headers.host+'/element/'});
});
app.get('/element/:id',(req, res)=>{
    let element = elements_data[parseInt(req.params['id'])];
    res.render('element',{element: {name: element.name, 
                                    image: path.join('elements',
                                                    element.folder_name,
                                                    'image.png'),
                                    description: fs.readFileSync( path.join('public',
                                                                            'elements',
                                                                            element.folder_name,
                                                                            'description.txt'),
                                                                'utf-8')},
                        menuLocation: 'http://'+req.headers.host+MENU});
});
http.listen(PORT,()=>console.log(`listening on port ${PORT}`));