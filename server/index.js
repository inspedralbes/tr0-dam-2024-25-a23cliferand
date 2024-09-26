// Get /questions Pa pillar
// PUT /question/id Pa Actualizar
// DELETE /question/id PA eliminar
// POST /questions 
// GET /partida
// POST /partida

const cors = require('cors')

const express = require('express');
const fs = require('fs');
const app = express();


const port = 3000;

const data =  JSON.parse(fs.readFileSync('./all.json', 'utf-8'));

let preguntes = data.preguntes;

app.use(express.json());
app.use(cors());
app.get('/getQuestions', (req, res) => {
  
    res.json(data);

});

app.get('/SEX', (req, res) => {
  
    const num = req.query.num;
    
    let preguntesPaMostrar = [];
  
    for (i = 0; i < num; i++) {
      let valor = preguntes[i];
      preguntesPaMostrar.push(valor.pregunta);
      preguntesPaMostrar.push(valor.respostes);
      preguntesPaMostrar.push(valor.imatge);
    }
  
    res.json(preguntesPaMostrar);
});


app.listen(port, () => {
  console.log("Port: " + port);
  console.log("Link: http://localhost:" + port);
});