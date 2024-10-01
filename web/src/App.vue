<template>
  <div>
    <h1>CRUD Questions</h1>

    <div v-if="preguntes && preguntes.length > 0">
      <div v-for="(preguntaItem, index) in preguntes" :key="preguntaItem.id">
        <h2>{{ preguntaItem.pregunta }}</h2>
        <br>
        <img class="marca" v-if="preguntaItem.imatge" :src="fetchFunctions.getImageUrl(preguntaItem.imatge)" alt="Imatge" width="150" />
        <br>
        <br>
        <table>
          <tr v-for="resposta in preguntaItem.respostes" :key="resposta.id">
            {{ resposta.resposta }} <img v-if="resposta.correcta" src="./../public/checked.png" width="10" />
          </tr>
        </table>
        
        <br>
        <button @click="mostrarFormularioEdit(preguntaItem.id - 1)" style="margin: 1em auto" class="btn">Modificar</button>
        <button @click="confirmarEliminar(preguntaItem.id)" style="margin: 1em auto" class="btn">Borrar</button>
        
        <br>

        <!-- Formulario pa editar -->
        <div v-if="preguntaEditable === index" class="pregunta-edit-container">
          <h3>Modificar Pregunta {{ preguntaItem.id }}</h3>
          <div class="form-group">
              <label for="pregunta">Pregunta:</label>
              <input v-model="preguntaEditada.pregunta" id="pregunta" placeholder="Editar pregunta" class="input-field" />
          </div>
    
          <div class="form-group">
            <label for="imagen">URL de la Imagen:</label>
            <textarea v-model="preguntaEditada.imatge" id="imagen" placeholder="Editar URL de la imagen" class="textarea-field"></textarea>
          </div>

          <h4>Respuestas:</h4>
          <div class="respuestas-container">
            <div v-for="(resposta, id) in preguntaItem.respostes" :key="id" class="respuesta-group">
              <div class="form-group">
                <label :for="'respuesta-' + id">Respuesta:</label>
                <input v-model="resposta.resposta" :id="'respuesta-' + id" placeholder="Editar respuesta" class="input-field" />
              </div>
            <label class="checkbox-label">
            Correcta: 
            <input type="checkbox" v-model="resposta.correcta" />
          </label>
        </div>
      </div>
        <button @click="preguntaEditable = null, guardarCambios(preguntaItem.id), fetchFunctions.getWeb(preguntes)" class="confirm">Guardar</button>
        <button @click="preguntaEditable = null, fetchFunctions.getWeb(preguntes)" class="confirm">Cancelar</button>
      </div>
    </div>

    <button @click="preguntaCrear = true" style="margin: 1em auto" type="submit" class="btn">Crear Pregunta</button>

    <!-- Formulario pa crear -->
    <div v-if="preguntaCrear" class="pregunta-edit-container">
          <h3>Crear Pregunta</h3>
          <div class="form-group">
              <label for="pregunta">Pregunta:</label>
              <input v-model="preguntaPlatilla.pregunta" id="pregunta" placeholder="Editar pregunta" class="input-field" />
          </div>
    
          <div class="form-group">
            <label for="imagen">URL de la Imagen:</label>
            <textarea v-model="preguntaPlatilla.imatge" id="imagen" placeholder="Editar URL de la imagen" class="textarea-field"></textarea>
          </div>

          <h4>Respuestas:</h4>
          <div class="respuestas-container">
            <div v-for="(resposta, id) in preguntaPlatilla.respostes" :key="id" class="respuesta-group">
              <div class="form-group">
                <label :for="'respuesta-' + id">Respuesta:</label>
                <input v-model="resposta.resposta" :id="'respuesta-' + id" placeholder="Editar respuesta" class="input-field" />
              </div>
            <label class="checkbox-label">
            Correcta: 
            <input type="checkbox" v-model="resposta.correcta" />
          </label>
        </div>
        <button @click="preguntaCrear = null, guardarPreguntaNueva(), fetchFunctions.getWeb(preguntes)" class="confirm">Guardar</button>
        <button @click="preguntaCrear = null, fetchFunctions.getWeb(preguntes)" class="confirm">Cancelar</button>
      </div>
      </div>
  </div>

  <div v-else>
    <p>No hi ha preguntes disponibles.</p>
  </div>
  <br>
  </div>
</template>

<script setup>

import { ref, onBeforeMount } from 'vue';

import * as fetchFunctions from './components/fetch.js';

const preguntaEditable = ref(null);
const preguntaABorrar = ref(null);
let preguntaEditada = ref(null); 
const preguntaCrear = ref(false);

const preguntes = ref()


onBeforeMount(() => {
  console.log("Create")

  fetch('http://localhost:3000/getQuestions')
    .then(response => response.json())
    .then(data => {preguntes.value = data.preguntes; console.log(preguntes.value); console.log(preguntes.value.length)
    })
    console.log("sex: " + preguntaCrear)
})

function mostrarFormularioEdit(id){
      preguntaEditable.value = id;
      preguntaEditada.value = JSON.parse(JSON.stringify(preguntes.value[id]));
    };



    const preguntaPlatilla = ref({
      id: 0,
      pregunta: "",
      respostes: [
        { id: 1, resposta: "", correcta: false },
        { id: 2, resposta: "", correcta: false },
        { id: 3, resposta: "", correcta: false },
        { id: 4, resposta: "", correcta: false }
      ],
      imatge: "???"
    });

    function guardarCambios(id){
    
    let updatePreg = preguntes.value
      
    updatePreg = updatePreg.find(objeto => objeto.id == id);
    
    updatePreg = JSON.stringify(updatePreg)
    
    fetch(`http://localhost:3000/updateQuestions/` + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
        },
     body: updatePreg
    })
    console.log(updatePreg)
    preguntaEditable.value = null;
};


function guardarPreguntaNueva(){

  let nuevaPregunta = preguntaPlatilla.value
    
    nuevaPregunta = JSON.stringify(nuevaPregunta)
    
    
    fetch(`http://localhost:3000/addQuestion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
        },
     body: nuevaPregunta
    })
    preguntaEditable.value = null;
};

function confirmarEliminar(id){
      fetch(`http://localhost:3000/deleteQuestions/` + id, {
        method: 'DELETE',
      })
      .then(res => console.log(res))
      .catch(error => console.error('Error:', error));
      fetchFunctions.getWeb(preguntes);
    };
</script>


<style scoped>
h1 {
  color: #42b983;
}
h2 {
  color: #333;
}
img.marca {
  margin-top: 10px;
  margin-bottom: 10px;
}

button.btn {
    background: #d61010;
    color: #fff;
    font-size: 14px;
    width: 100%;
    height: 55px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: color 0.4s linear;
    position: relative;
    overflow: hidden;
    z-index: 1
}

button.confirm {
    background: #d61010;
    color: #fff;
    margin-top: 2mm;
    margin-left: 2mm;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: color 0.4s linear;
    position: relative;
    overflow: hidden;
    z-index: 1
}
.pregunta-edit-container {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 400px;
  margin: 20px auto;
}

.form-group {
  margin-bottom: 16px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 4px;
}

.textarea-field {
  resize: vertical;
  min-height: 60px;
}

.respuestas-container {
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.respuesta-group {
  margin-bottom: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
}
</style>
