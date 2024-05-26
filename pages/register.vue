<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Register</v-card-title>
          <v-alert v-if="errorDupe" variant="tonal" type="error">El usuario ya existe. Elige otro.</v-alert>
          <v-alert v-if="success" variant="tonal" type="success">Usuario registrado. Ya puedes iniciar sesion</v-alert>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                required
                type="password"
              ></v-text-field>
              <v-btn @click="register">Register</v-btn>
              <v-btn @click="navigateTo('/login')">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

const errorDupe = ref(false)
const success = ref(false)

const username = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
  await $fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value
    })
  }).then((res) => {
    if (typeof res === 'object') {
      username.value = ''
      email.value = ''
      password.value = ''
      success.value = true
    }
  }).catch((error) => {
    errorDupe.value = true
  })
}
</script>