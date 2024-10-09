export function getImageUrl(imageName){
    //Foto default
    //if(imageName == "???"){
    //  return `http://dam.inspedralbes.cat:26969/getImage/noimage.jpg`;
    //}
    return imageName;
  };

export async function guardarPreguntaNueva(preguntaPlatilla){

    let nuevaPregunta = preguntaPlatilla.value

    let idd
    
    nuevaPregunta = JSON.stringify(nuevaPregunta)
    
    
    fetch(`http://dam.inspedralbes.cat:26969/addQuestion`, {
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
  
  fetch(`http://dam.inspedralbes.cat:26969/updateQuestions/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' 
      },
   body: preguntaEditada
  })
  console.log(preguntaEditada)
}


export async function getWeb(preguntes){
    fetch('http://dam.inspedralbes.cat:26969/getQuestions')
        .then(response => response.json())
        .then(data => {preguntes.value = data.preguntes; console.log(preguntes.value);
        })
        //window.location.reload()
    };

export async function Eliminar(id){
   fetch(`http://dam.inspedralbes.cat:26969/deleteQuestions/` + id, {
     method: 'DELETE',
   })
   .then(res => console.log(res))
   .catch(error => console.error('Error:', error));
};

export async function final(container){
  fetch('http://dam.inspedralbes.cat:26969/final')
      .then(response => response.text())
      .then(data => {container = data; console.log(container);
      })
      //window.location.reload()
  };