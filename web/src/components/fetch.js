export function getImageUrl(imageName){
    //Foto default
    if(imageName == "???"){
      return `http://localhost:3000/getImage/noimage.jpg`;
    }
  
    return `http://localhost:3000/getImage/${imageName}`;
  };

export async function guardarPreguntaNueva(preguntaPlatilla){

    let nuevaPregunta = preguntaPlatilla.value
    
    nuevaPregunta = JSON.stringify(nuevaPregunta)
    
    
    fetch(`http://localhost:3000/addQuestion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
        },
     body: nuevaPregunta
    })

    return nuevaPregunta
};

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
        .then(data => {preguntes.value = data.preguntes; console.log(preguntes.value); console.log(preguntes.value.length)
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