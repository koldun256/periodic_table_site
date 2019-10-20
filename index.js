const express = require('express');
const app = express();
const elements_data = require('./elements_data');
const http = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
app.use(express.static('public'));
app.set('view engine','ejs');
app.get('/element/:id',(request, response)=>{
    response.render('element',elements_data[parseInt(request.params['id'])]);
});
http.listen(PORT,()=>console.log(`listening on port ${PORT}`));