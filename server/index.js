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
const path = require('path');


const port = 3000;

app.use(express.json());
app.use(cors());


app.get('/getQuestions', (req, res) => {
  
  const data =  JSON.parse(fs.readFileSync('./all.json', 'utf-8'));
    res.json(data);

});

app.get('/getQuestionsAndroid', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./all.json', 'utf-8'));
  let preguntes = data.preguntes;

  for (let i = 0; i < preguntes.length; i++) {
    for (let x = 0; x < preguntes[i].respostes.length; x++) {
      delete preguntes[i].respostes[x].correcta; 
    }
  }

  res.json(preguntes);
});

app.put('/putQuestions/:id', (req, res) => {

  const nuevasPreguntes = JSON.stringify(req.body.values);


  fs.writeFile('src/assets/js/myScript.js', nuevasPreguntes, (err) => {
    if (err) {
      console.error('Error al sobrescribir el archivo:', err);
    } else {
      console.log('Archivo sobrescrito con éxito');
    }
  })
});

app.put('/updateQuestions/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const updateQuestion = JSON.stringify(req.body);

    fs.readFile('./all.json', 'utf8', (err, data) => {
      if (err) {
        res.status('Error al leer el archivo:', err);
      }
  
      let objetos = JSON.parse(data);
  
      objetos.preguntes = objetos.preguntes.map(pregunta => pregunta.id === id ? JSON.parse(updateQuestion) : pregunta);

      objetos = JSON.stringify(objetos);

      objetos = JSON.parse(objetos);

      fs.writeFile('./all.json', JSON.stringify(objetos, null, 2), (err) => {
        if (err) {
          res.status('Error al sobrescribir el archivo:', err);
        } else {
          res.status(`Objeto con ID ${id} update.`);
          (objetos)
        }
      })
    })
});

app.delete('/deleteQuestions/:id', (req, res) =>{

    const id = parseInt(req.params.id); 

    fs.readFile('./all.json', 'utf8', (err, data) => {
      if (err) {
        res.status('Error al leer el archivo:', err);
      }
  
      let objetos = JSON.parse(data);
  
      objetos.preguntes = objetos.preguntes.filter(objeto => objeto.id !== id);

      fs.writeFile('./all.json', JSON.stringify(objetos, null, 2), (err) => {
        if (err) {
          res.status('Error al sobrescribir el archivo:', err);
        } else {
          res.status(`Objeto con ID ${id} eliminado con éxito.`);
          res.set("Connection", "close");
        }
      })
    })
})

    
app.get('/getImage/:route', (req, res) => {
  const route = req.params.route; 

  const imagePath = path.join(__dirname, 'images', route);

  res.sendFile(imagePath, (err) => {
      if (err) {
          console.error(err);
          res.status(404).send('Imagen no encontrada');
      }
  });
});

app.listen(port, () => {
  console.log("Port: " + port);
  console.log("Link: http://localhost:" + port);
});