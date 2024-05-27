// middleware/redirectIfAuthenticated.ts
import { defineNuxtRouteMiddleware, useRuntimeConfig } from 'nuxt/app'
import { jwtVerify } from 'jose'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  const token = useCookie('token').value

  if (!token) {
    return
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(config.jwt_secret), {
      issuer: 'master:listoapp',
      audience: 'listoapp:users',
    })
    if (to.path === '/login') {
      return navigateTo('/')
    }
  } catch (err) {
    // El token no es válido o ha expirado, no redirigir
  }
})