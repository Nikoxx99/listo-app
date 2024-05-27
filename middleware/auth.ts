import jwt from 'jsonwebtoken'
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/login' || to.path === '/register') {
    return
  }
  const cookie = useCookie('token')
  try { 
    const valid = jwt.verify(cookie.value || '', process.env.JWT_SECRET || 'secret')
    if (!valid) {
      return navigateTo('/login')
    }
  } catch (e) {
    cookie.value = ''
    return navigateTo('/login')
  }
})