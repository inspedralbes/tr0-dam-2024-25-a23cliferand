<template>
  <div class="header-container">
    <h1>CRUD Questions</h1>
    <br>
    <h2>Estadístiques</h2>
    <div class="stats-container">
      <div class="stat-item">
        <img src="http://a23cliferand.dam.inspedralbes.cat:26969/getImage/falladas.png" alt="Falladas" width="550" height="550" />
      </div>
      <div class="stat-item">
        <img src="http://a23cliferand.dam.inspedralbes.cat:26969/getImage/quesito.png" alt="Quesito" width="550" height="550" />
      </div>
    </div>
    <br><hr><br>
    <h1>Preguntes</h1>
    <div v-if="preguntes && preguntes.length > 0">
      <div v-for="(preguntaItem, index) in preguntes" :key="preguntaItem.id">
        <h2>{{ preguntaItem.pregunta }}</h2>
        <br>
        <div class="image-container">
          <img class="marca" v-if="preguntaItem.imatge" :src="fetchFunctions.getImageUrl(preguntaItem.imatge)" alt="Imatge" width="150" />
        </div>
        <br>
        <br>
        <table>
          <tr v-for="resposta in preguntaItem.respostes" :key="resposta.id">
            {{ resposta.resposta }} <img v-if="resposta.correcta" src="./../public/checked.png" width="10" />
          </tr>
        </table>
        
        <br>
        <button @click="mostrarFormularioEdit(index)" style="margin: 1em auto" class="btn">Modificar</button>
        <button @click="EliminarQuestion(preguntaItem.id)" style="margin: 1em auto" class="btn">Borrar</button>        
        <br>

        <!-- Formulario pa editar -->
        <div v-if="preguntaEditable === index" class="pregunta-edit-container">
          <h3>Modificar Pregunta</h3>
          <div class="form-group">
              <label for="pregunta">Pregunta:</label>
              <input v-model="preguntaEditada.pregunta" id="pregunta" placeholder="Editar pregunta" class="input-field" />
          </div>
    
          <div class="form-group">
            <label for="imagen">URL de la Imatge:</label>
            <textarea v-model="preguntaEditada.imatge" id="imagen" placeholder="Editar URL de la imatge" class="textarea-field"></textarea>
          </div>

          <h4>Respuestas:</h4>
          <div class="respuestas-container">
            <div v-for="(resposta, id) in preguntaItem.respostes" :key="id" class="respuesta-group">
              <div class="form-group">
                <label :for="'respuesta-' + id">Resposta:</label>
                <input v-model="resposta.resposta" :id="'respuesta-' + id" placeholder="Editar resposta" class="input-field" />
              </div>
            <label class="checkbox-label">
            Correcta: 
            <input type="checkbox" v-model="resposta.correcta" />
          </label>
        </div>
      </div>
        <button @click="preguntaEditable = null, guardarCambios(preguntaItem.id), fetchFunctions.getWeb(preguntes)" class="confirm">Salvar</button>
        <button @click="preguntaEditable = null, restaurarPreguntas(preguntaItem.id), fetchFunctions.getWeb(preguntes)" class="confirm">Cancel·lar</button>
      </div>
    </div>
    <br>
    <button @click="preguntaCrear = true" style="margin: 1em auto" type="submit" class="btn_float">Crear Pregunta</button>
    <br>


    
    <!-- Formulario pa crear -->
    <div v-if="preguntaCrear" class="floating-container">
          <h3> Crear Pregunta</h3>
          <div class="form-group">
              <label for="pregunta">Pregunta:</label>
              <input v-model="preguntaPlatilla.pregunta" id="pregunta" placeholder="Editar pregunta" class="input-field" />
          </div>
    
          <div class="form-group">
            <label for="imagen">URL de la Imatge:</label>
            <textarea v-model="preguntaPlatilla.imatge" id="imagen" placeholder="Editar URL de la Imatge" class="textarea-field"></textarea>
          </div>

          <h4>Respuestas:</h4>
          <div class="respuestas-container">
            <div v-for="(resposta, id) in preguntaPlatilla.respostes" :key="id" class="respuesta-group">
              <div class="form-group">
                <label :for="'respuesta-' + id">Resposta:</label>
                <input v-model="resposta.resposta" :id="'respuesta-' + id" placeholder="Editar respuesta" class="input-field" />
              </div>
            <label class="checkbox-label">
            Correcta: 
            <input type="checkbox" v-model="resposta.correcta" />
          </label>
        </div>
        <button @click="preguntaCrear = null, PreguntaNueva(), fetchFunctions.getWeb(preguntes)" class="confirm">Salvar</button>
        <button @click="preguntaCrear = null, fetchFunctions.getWeb(preguntes)" class="confirm">Cancel·lar</button>
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

let preguntaOriginal = ref(null); 
const preguntaEditable = ref(null);
let preguntaEditada = ref(null); 
const preguntaCrear = ref(false);
let container = ref(null);

const preguntes = ref()

onBeforeMount(() => {
  console.log("Create")
  fetchFunctions.getWeb(preguntes)
})

function mostrarFormularioEdit(id){
      preguntaEditable.value = id;
      preguntaOriginal.value = JSON.parse(JSON.stringify(preguntes.value[id]));
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
  imatge: "http://dam.inspedralbes.cat:26969/getImage/noimage.jpg"
});

function guardarCambios(id) {
    let updatePreg = preguntes.value;
    const preguntaIndex = updatePreg.findIndex(pregunta => pregunta.id === id);
    updatePreg[preguntaIndex].text = preguntaEditable.value;
    const updatedPreg = JSON.stringify(updatePreg[preguntaIndex]);
    fetchFunctions.updateQuestion(id, updatedPreg);
    preguntaEditable.value = null;
    //window.location.reload()
};

function restaurarPreguntas(id) {
  preguntes.value[id] = JSON.parse(JSON.stringify(preguntaOriginal.value));
}

function EliminarQuestion(id){
  fetchFunctions.Eliminar(id);
  console.log(preguntes.value)
  preguntes.value = preguntes.value.filter(pregunta => pregunta.id !== id);
  console.log(preguntes)
  };

  async function PreguntaNueva(){
 await fetchFunctions.guardarPreguntaNueva(preguntaPlatilla);
  console.log(preguntes)
  preguntaCrear.value = null;
  preguntes.value.push(preguntaPlatilla.value)
  console.log(preguntes)
  preguntaPlatilla.value = {
        id: 0,
        pregunta: "",
        respostes: [
            { id: 1, resposta: "", correcta: false },
            { id: 2, resposta: "", correcta: false },
            { id: 3, resposta: "", correcta: false },
            { id: 4, resposta: "", correcta: false }
        ],
        imatge: "http://a23cliferand.dam.inspedralbes.cat:26969/getImage/noimage.jpg"
    };
  }
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
  display: block;
  margin-left: auto;
  margin-right: auto;
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
    z-index: 1;
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
    z-index: 1;
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

.floating-container {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
    max-width: 400px;
}

.btn_float {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    background: #d61010;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
.stat-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
}

.stats-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>