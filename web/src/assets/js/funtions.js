const enviarDatosActualizados = () => {
    fetch('http://localhost:3000/updateQuestions', {
      method: 'POST',
      body: JSON.stringify(preguntes.value),
    })
  
    fetch('http://localhost:3000/getQuestions')
      .then(response => response.json())
      .then(data => { console.log(preguntes.value); console.log(preguntes.value.length)
      })
  };
  
  const mostrarFormulario = (index) => {
    preguntaEditable.value = index;
    preguntaEditada.value = JSON.parse(JSON.stringify(preguntes.value[index]));
  };
  
  const guardarCambios = (index) => {
    preguntes.value[index] = preguntaEditada.value;
    preguntaEditable.value = null;
    enviarDatosActualizados();
  };
  
  const borrarPregunta = (index) => {
    preguntes.value.splice(index, 1);
    preguntaABorrar.value = null;
    enviarDatosActualizados();
  };