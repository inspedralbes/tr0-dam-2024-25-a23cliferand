export function getImageUrl(imageName){
    //Foto default
    if(imageName == "???"){
      return `http://localhost:3000/getImage/noimage.jpg`;
    }
  
    return imageName;
  };

export async function guardarPreguntaNueva(preguntaPlatilla){

    let nuevaPregunta = preguntaPlatilla.value

    let idd
    
    nuevaPregunta = JSON.stringify(nuevaPregunta)
    
    
    fetch(`http://localhost:3000/addQuestion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
        },
     body: nuevaPregunta
    })
    .then(response => response.text)
    .then(data => {
         idd = data;
        })
    .catch(error => {
        console.error("No va: " + error);
    });

    preguntaPlatilla.value.id = idd

    console.log(preguntaPlatilla.value.id)
}

export async function updateQuestion(id, preguntaEditada){
  
  fetch(`http://localhost:3000/updateQuestions/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' 
      },
   body: preguntaEditada
  })
  console.log(preguntaEditada)
}


export async function getWeb(preguntes){
    fetch('http://localhost:3000/getQuestions')
        .then(response => response.json())
        .then(data => {preguntes.value = data.preguntes; console.log(preguntes.value);
        })
        //window.location.reload()
    };

export async function Eliminar(id){
   fetch(`http://localhost:3000/deleteQuestions/` + id, {
     method: 'DELETE',
   })
   .then(res => console.log(res))
   .catch(error => console.error('Error:', error));
};

export async function final(container){
  fetch('http://localhost:3000/final')
      .then(response => response.text())
      .then(data => {container = data; console.log(container);
      })
      //window.location.reload()
  };