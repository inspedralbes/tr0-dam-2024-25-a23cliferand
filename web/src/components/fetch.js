export function getImageUrl(imageName){
    //Foto default
    if(imageName == "???"){
      return `http://localhost:3000/getImage/noimage.jpg`;
    }
  
    return `http://localhost:3000/getImage/${imageName}`;
  };

export function getWeb(preguntes){
    fetch('http://localhost:3000/getQuestions')
        .then(response => response.json())
        .then(data => {preguntes.value = data.preguntes; console.log(preguntes.value); console.log(preguntes.value.length)
        })
        //window.location.reload()
    };

//export function guardarCambios(preguntaPlantilla){
//    
//   let updatePreg = preguntes.value;
//      
//    updatePreg = updatePreg.find(objeto => objeto.id == id);
//    
//   updatePreg = JSON.stringify(updatePreg)
//    
//    
//    fetch(`http://localhost:3000/updateQuestions/` + id, {
//      method: 'PUT',
//      headers: {
//        'Content-Type': 'application/json' 
//        },
//     body: updatePreg
//    })
//    console.log(updatePreg)
//    preguntaEditable.value = null;
//};