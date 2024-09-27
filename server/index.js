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

//app.put('/putQuestions/:id', (req, res) => {
//
//  const nuevasPreguntes = JSON.stringify(req.body);


//  fs.writeFile('src/assets/js/myScript.js', nuevasPreguntes, (err) => {
//if (err) {
//  console.error('Error al sobrescribir el archivo:', err);
//    } else {
//      console.log('Archivo sobrescrito con éxito');
//    }
//  })
//});

app.put('/putQuestions/:id', (req, res) => {

  const nuevasPreguntes = JSON.stringify(req.body);


  fs.writeFile('src/assets/js/myScript.js', nuevasPreguntes, (err) => {
    if (err) {
      console.error('Error al sobrescribir el archivo:', err);
    } else {
      console.log('Archivo sobrescrito con éxito');
    }
  })
});

app.delete('/deleteQuestions/:id', (req, res) =>{

    const id = parseInt(req.params.id); 

    fs.readFile('./all.json', 'utf8', (err, data) => {
      if (err) {
        res.status('Error al leer el archivo:', err);
      }
  
      let objetos = JSON.parse(data);
  
      objetos = objetos.filter(objeto => objeto.id !== id);

      fs.writeFile('./all.json', JSON.stringify(objetos, null, 2), (err) => {
        if (err) {
          res.status('Error al sobrescribir el archivo:', err);
        } else {
          res.status(`Objeto con ID ${id} eliminado con éxito.`);
        }
      })
    })
})


app.listen(port, () => {
  console.log("Port: " + port);
  console.log("Link: http://localhost:" + port);
});