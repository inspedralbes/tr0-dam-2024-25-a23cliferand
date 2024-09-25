<template>
  <div>
    <h1>{{ greeting }}</h1>

    <div v-if="preguntes && preguntes.length">
      <div v-for="(preguntaItem, index) in preguntes" :key="index">
        <h2>{{ preguntaItem.pregunta }}</h2>
        
        <img class="marca" v-if="preguntaItem.imatge" :src="preguntaItem.imatge" alt="Imatge de la pregunta" width="150" />

        <table>
          <tr v-for="resposta in preguntaItem.respostes" :key="resposta.id">
            {{ resposta.resposta }} <img v-if="resposta.correcta" src="./../public/checked.png" width="10"/>
          </tr>
        </table>
        <br>
        <button v-on:click="console.log('Modificar Num ' + resposta.id)" style="margin: 1em auto" type="submit" class="btn">Modificar</button>
        <button v-on:click="console.log('Borrar Num ' + resposta.id)" style="margin: 1em auto" type="submit" class="btn">Borrar</button>          
        <br>
      </div>
    </div>

    <div v-else>
      <p>No hi ha preguntes disponibles.</p>
    </div>

    <button style="margin: 1em auto" type="submit" class="btn">Crear Pregunta</button>
  </div>
</template>

<script setup>
if(localStorage.getItem('darkMode') == 'enabled'){
    document.body.classList.toggle('dark-theme');
  }
import { ref } from 'vue'
import data from './assets/all.json'


const greeting = ref('Benvingut al qüestionari!')
const preguntes = ref(data.preguntes)
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
