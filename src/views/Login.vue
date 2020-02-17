<template>
  <div class="auth-view">
    <div class="login">
      <form class="login__form" @submit.prevent="submitForm">
        <legend>Авторизация</legend>

        <b-field label="Email"
          label-position="on-border"
          :type="{'is-danger': ($v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email), 'is-success': !$v.email.$invalid}"
          :message="{
            'Неккоректный Email': $v.email.$dirty && $v.email.required && $v.email.$invalid,
            'Поле Email не должно быть пустым': $v.email.$dirty && !$v.email.required
            }"
          >
          <b-input
            id="email"
            class="inp-form"
            type="text"
            placeholder="email"
            v-model.trim="email"
            maxlength="30"
          ></b-input>
        </b-field>
        <b-field label="Password"
          label-position="on-border"
          :type="{'is-danger': ($v.password.$dirty && !$v.password.required || $v.password.$dirty && !$v.password.minLength), 'is-success': !$v.password.$invalid}"
          :message="{
            'Не менее 6 символов': ($v.password.$dirty && $v.password.required && $v.password.$invalid || $v.password.$dirty)
            }"
          >
          <b-input
            id="password"
            class="inp-form"
            type="password"
            placeholder="password"
            v-model.trim="password"
            password-reveal
            maxlength="30"
          ></b-input>
        </b-field>
        <small v-if="$store.state.error != null" class="invalid">Неверный Email или пароль</small>

        <b-button tag="input" native-type="submit" type="is-ligth" value="Отправить" />
      </form>
      <b-button tag="router-link" to="/register" type="is-link">Регистрация</b-button>
      <b-button tag="router-link" to="/" type="is-text">На главную</b-button>
    </div>
  </div>
</template>

<script>
import {email, required, minLength} from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)},
  },
  methods: {

    async submitForm() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch(e) {null;}
    }
  },
  watch: {
    email() {
      this.$v.email.$touch();
    },
    password() {
      this.$v.password.$touch();
    }
  }
}
</script>

<style lang="scss" scoped>

$widthForm: 400px;
$heightForm: 600px;

.login {
  width: $widthForm;
  height: $heightForm;
  box-shadow: 0 0 6px 1px black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__form {
    width: $widthForm*0.8;
    height: $heightForm*0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    legend {
      font-size: 18pt;
      margin-bottom: 30px
    }

    .field {
      margin-bottom: 0;
      margin-top: 30px;
      width: 100%;
    }


    & > input{
      margin-top: 30px;
    }

  }

}

.invalid {
  color: red;
}

</style>
