
<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
      class="d-flex"
    >
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
       {{ new Date().getFullYear() }} — <strong> {{ $t('app.title') }} </strong>

      <v-tooltip top
        v-for="(icon, index) in icons"
        :key="index"
        color="indigo"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            class="mx-4"
            dark
            icon
            @click="redirect(icon.value)"
          >
            <v-icon size="24px">{{ icon.img }}</v-icon>
          </v-btn>
        </template>
        <span> {{ icon.value }} </span>
      </v-tooltip>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      { img: 'mdi-facebook', value: 'Facebook' },
      { img: 'mdi-twitter', value: 'Twitter' },
      { img: 'mdi-linkedin', value: 'https://www.linkedin.com/in/marwen-ben-hamada-642b71133/' },
      { img: 'mdi-instagram', value: 'Instagram' }
    ]
  }),
  methods: {
    redirect (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
