// Get /questions Pa pillar
// PUT /question/id Pa Actualizar
// DELETE /question/id PA eliminar
// POST /questions 
// GET /partida
// POST /partida

const lista = [];

const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');


const port = 26969;

app.use(express.json());
app.use(express.text());
app.use(cors()); 


app.get('/getQuestions', (req, res) => {
  
  const data =  JSON.parse(fs.readFileSync('./all.json', 'utf-8'));
    res.json(data);

});

app.get('/getQuestionsAndroid/:id', (req, res) => {
  const id = req.params.id;

  let found = lista.find(item => item.id === id);
  let preguntes = [];
  

  if (!found) {
    const data = JSON.parse(fs.readFileSync('./all.json', 'utf-8'));
    preguntes = data.preguntes;

    const nuevo = {
      id: id,
      preguntes: preguntes
    };

    lista.push(nuevo);
  }
  else {
    preguntes = found.preguntes
  }

  for (let i = 0; i < preguntes.length; i++) {
    for (let x = 0; x < preguntes[i].respostes.length; x++) {
      delete preguntes[i].respostes[x].correcta;
    }
  }

  res.json(preguntes);
});

app.put('/addQuestion', (req, res) => {
  const newQuestion = req.body;

  fs.readFile("./all.json", 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return res.status(500).send('Error al leer el archivo.');
    }

    let questions = [];
    questions = JSON.parse(data);
    console.log(questions)
    
    let newId;
    for (let i = 1; i <= 999; i++) {
      if (!questions.preguntes.some(pregunta => pregunta.id === i.toString())) {
      newId = i.toString();
      break;
      }
    }

    newQuestion.id = newId;

    questions.preguntes.push(newQuestion);

    console.log(newQuestion)

    fs.writeFile("./all.json", JSON.stringify(questions, null, 2), (writeErr) => {
     if (writeErr) {
        console.error('Error al sobrescribir el archivo:', writeErr);
        return res.status(500).send('Error al sobrescribir el archivo.');
      }

      console.log('Archivo sobrescrito con éxito');
      return res.status(200).send('Pregunta agregada con éxito.');
    });
  });
});

app.put('/updateQuestions/:id', (req, res) => {

  const id = req.params.id;

  const updateQuestion = JSON.stringify(req.body);

    fs.readFile('./all.json', 'utf8', (err, data) => {
      if (err) {
        res.status('Error al leer el archivo:', err);
      }
  
      let objetos = JSON.parse(data);
  
      objetos.preguntes = objetos.preguntes.map(pregunta => pregunta.id === id ? JSON.parse(updateQuestion) : pregunta);

      objetos = JSON.stringify(objetos);

      objetos = JSON.parse(objetos);

      fs.writeFile("./all.json", JSON.stringify(objetos, null, 2), (writeErr) => {
        if (writeErr) {
           console.error('Error al sobrescribir el archivo:', writeErr);
           return res.status(500).send('Error al sobrescribir el archivo.');
         }
   
         return res.status(200).send(objetos);
       });
    })
});

app.delete('/deleteQuestions/:id', (req, res) => {
  const id = req.params.id; 

  fs.readFile('./all.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo: ' + err); // Enviar mensaje de error
    }


    let objetos = JSON.parse(data);

    objetos.preguntes = objetos.preguntes.filter(objeto => objeto.id !== id);

    fs.writeFile('./all.json', JSON.stringify(objetos, null, 2), (err) => {
     res.status(200).send(`Objeto con ID ${id} eliminado con éxito.`);
    });
  });
});

    
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

app.get('/getGrafics', (req, res) => {

  var spawn = require("child_process").spawn;

  var process = spawn('python3', ["./grafics.py"]);

  process.stdout.on('data', function (data) {
    res.send(data.toString());
    console.log(data.toString());
  });
});

//Comprobar las respuestas
app.put('/putRespostes', (req, res) => {
  let respostes = req.body;

  let solucions = { correctes: 0, incorrectes: 0 };

  fs.readFile('./all.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo: ' + err);
    }

    let objetos = JSON.parse(data);
    let preguntes = objetos.preguntes;

    for (let i = 0; i < respostes.length; i++) {
      let resposta = respostes[i];
    
      if (resposta.respostaID === 0) {
        solucions.incorrectes++;
        continue;
      }
    
      let pregunta = preguntes.find(p => p.id === resposta.preguntaID);
    
      if (pregunta) {
        let respostaCorrecta = pregunta.respostes.find(r => r.id === resposta.respostaID);
    
        if (respostaCorrecta) {
          if (respostaCorrecta.correcta === true) {
            solucions.correctes++;
          } else {
            solucions.incorrectes++;
          }
        }
      }
    }

    let all = {respostes, solucions}
    saveJsonToFile(all)
    return res.status(200).json(solucions);
  });
});

function saveJsonToFile(jsonObject) {
  // Obtener la fecha y hora actual
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
  const year = now.getFullYear();
  const date = `${day}-${month}-${year}`; // DD-MM-YYYY
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '_'); // HH_MM_SS

  // Crear la ruta del directorio
  const dirPath = path.join(__dirname, 'data', date);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Crear la ruta del archivo
  const filePath = path.join(dirPath, `${time}.json`);

  // Escribir el objeto JSON en el archivo
  fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2), 'utf8');
}


app.listen(port, () => {
  console.log("Port: " + port);
  console.log("Link: http://dam.inspedralbes.cat:" + port);
});