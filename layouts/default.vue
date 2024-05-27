<template>
  <v-app>
  <v-navigation-drawer
      expand-on-hover
      rail
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          subtitle="usuario"
          title="Listo App User"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-text-box-multiple-outline" title="Inventario" value="inventory" to="/inventory"></v-list-item>
        <v-list-item prepend-icon="mdi-printer-pos" title="Facturas" value="bills" to="/bills"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>