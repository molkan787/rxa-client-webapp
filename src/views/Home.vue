<template>
  <div class="home">
    <v-card class="pa-4" max-width="300px">
      <v-btn @click="actionClick('upload-document')" elevation="0" block>Upload Document</v-btn>
      <br>
      <v-btn @click="actionClick('add-entry')" elevation="0" block>Add Expense</v-btn>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  methods: {
    actionClick(name){
      this.$router.push(name);
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  .v-card{
    margin: auto;
    button{
      padding: 30px !important;
    }
  }
}
</style>
