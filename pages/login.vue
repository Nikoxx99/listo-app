<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-alert v-if="error" variant="tonal" type="error">Usuario o clave erradas</v-alert>
          <v-alert v-if="success" variant="tonal" type="success">Login correcto</v-alert>
          <v-alert v-if="errorHashVersion" variant="tonal" type="info">Usuario deprecado, solicita actualizacion al webmaster</v-alert>
          <v-card-text>
            <v-text-field
              v-model="username"
              label="Username"
              outlined
              @keyup.enter="login"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              type="password"
              @keyup.enter="login"
            ></v-text-field>
            <v-btn @click="login">Login</v-btn>
            <v-btn @click="navigateTo('/register')">Registrar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import Cookies from 'js-cookie'

const config = useRuntimeConfig()
const error = ref(false)
const success = ref(false)
const errorHashVersion = ref(false)
const username = ref('')
const password = ref('')

async function login () {
  const res = await $fetch(`http://localhost:3000/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
  console.log(res)
  if (typeof res === 'object' && !res.error) {
    Cookies.set('token', res.token)
    error.value = false
    errorHashVersion.value = false

  } else {
    error.value = true
  }
}
</script>