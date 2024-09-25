<template>
    <h1>Web de Admin</h1><br><br>
  <div style="align-content: ">
    <div v-for="(pregunta, index) in preguntas" :key="pregunta.id" class="pregunta-card">
      <h2>{{ pregunta.pregunta }}</h2>
      <img v-if="pregunta.imatge && pregunta.imatge !== '???'" :src="pregunta.imatge" class="pregunta-image" />      <ul>
        <li v-for="solu in pregunta.respostes" :key="solu.id">
          <input type="radio" :id="solu.id" :name="pregunta.id" :value="solu.resposta" />
          <label :for="solu.id">{{ " " + solu.resposta }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preguntas: []
    };
  },
  async created() {
    await this.loadPreguntas();
  },
  methods: {
    async loadPreguntas() {
        const response = await fetch('/all.json');
        const data = await response.json();
        this.preguntas = data.preguntes;
    }
  }
};
</script>

<style scoped>

preguntas-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}
.pregunta-card {
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 5px;
}

.pregunta-image {
  max-width: 100%;
  height: auto;

}.template{
    align-items: center;
}
</style>
  