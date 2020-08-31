<template>
  <div class="login">
    <div class="wrapper">
      <v-card width="500px">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form @submit="formSubmit">
            <v-text-field name="username" :disabled="loading" v-model="username" label="Username" placeholder="username" dense outlined />
            <v-text-field name="password" :disabled="loading" v-model="password" label="Password" placeholder="password" dense outlined type="password" />
            <v-btn type="submit" :loading="loading" color="primary" block elevation="0">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import Session from '../services/session';

export default {
  data:() => ({
    loading: false,
    username: '',
    password: '',
  }),
  methods: {
    async formSubmit(event){
      event.preventDefault();
      if(this.validateForm()){
        this.loading = true;
        await this.login();
        this.loading = false;
      }
    },
    validateForm(){
      if(this.username.trim().length < 2){
        alert('Please enter a valid username.');
      }else if(this.password.trim().length < 6){
        alert('Please enter a valid password.');
      }else{
        return true;
      }
      return false;
    },
    async login(){
      try{
        const success = await Session.login(this.username.trim(), this.password.trim());
        if(success){
          this.$router.push('/');
        }else{
          alert('Incorrect combination of username and password.', 'Login failed!')
        }
      }catch(error){
        alert('An error occured, Please check your internet connection and try again.', 'Error!');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  display: table;
  height: 100%;
  width: 100%;
  padding-bottom: 80px;
  .wrapper{
    display: table-cell;
    vertical-align: middle;
    .v-card{
      margin: auto;
    }
  }
}
</style>
