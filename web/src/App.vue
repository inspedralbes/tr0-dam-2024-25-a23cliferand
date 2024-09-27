<template>
  <div>
    <h1>{{ greeting }}</h1>

    <div v-if="preguntes && preguntes.length > 0">
      <div v-for="(preguntaItem, index) in preguntes" :key="index">
        <h2>{{ preguntaItem.pregunta }}</h2>
        
        <img class="marca" v-if="preguntaItem.imatge" :src="preguntaItem.imatge" alt="Imatge de la pregunta" width="150" />
        <table>
          <tr v-for="resposta in preguntaItem.respostes" :key="resposta.id">
            {{ resposta.resposta }} <img v-if="resposta.correcta" src="./../public/checked.png" width="10"/>
          </tr>
        </table>
        <br>
        <button v-on:click="mostrarFormulario(index)" style="margin: 1em auto" type="submit" class="btn">Modificar</button>
        <button v-on:click="confirmarEliminar(index)" style="margin: 1em auto" type="submit" class="btn">Borrar</button>          
        <br>
        <!-- Formulario de edición -->
      <div v-if="preguntaEditable === index">
        <h3>Modificar Pregunta</h3>
        <input v-model="preguntaEditada.pregunta" placeholder="Editar pregunta" />
        <textarea v-model="preguntaEditada.imatge" placeholder="Editar URL de la imagen"></textarea>

        <h4>Respuestas:</h4>
        <div v-for="(resposta, idx) in preguntaEditada.respostes" :key="idx">
          <input v-model="resposta.resposta" placeholder="Editar respuesta" />
          <label>
            Correcta:
            <input type="checkbox" v-model="resposta.correcta" />
          </label>
        </div>

        <button @click="guardarCambios(index)">Guardar</button>
        <button @click="preguntaEditable = null">Cancelar</button>
      </div>
      
      <!-- Confirmación de borrado -->
      <div v-if="preguntaABorrar === index">
        <p>¿Estás seguro que deseas borrar esta pregunta?</p>
        <button @click="borrarPregunta(index)">Confirmar</button>
        <button @click="preguntaABorrar = null">Cancelar</button>
      </div>
      </div>
    </div>

    <div v-else>
      <p>No hi ha preguntes disponibles.</p>
    </div>
    <br>
    <button style="margin: 1em auto" type="submit" class="btn">Crear Pregunta</button>
  </div>
</template>

<script setup>

const greeting = ref('Title Example')

const preguntaEditable = ref(null);
const preguntaABorrar = ref(null);
let preguntaEditada = ref(null); 

import { reactive, ref, onBeforeMount } from 'vue'

const preguntes = ref()


onBeforeMount(() => {
  console.log("Create")

  fetch('http://localhost:3000/getQuestions')
    .then(response => response.json())
    .then(data => {preguntes.value = data.preguntes; console.log(preguntes.value); console.log(preguntes.value.length)
    })
})

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

</style>
