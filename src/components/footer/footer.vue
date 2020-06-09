
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
       {{ currentYear }} — <strong> {{ $t('app.title') }} </strong>

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
            @click="redirect(icon.path)"
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
      { img: 'mdi-facebook', value: 'Facebook', path: 'https://www.linkedin.com/in/marwen-ben-hamada-642b71133/' },
      { img: 'mdi-twitter', value: 'Twitter', path: 'https://www.linkedin.com/in/marwen-ben-hamada-642b71133/' },
      { img: 'mdi-linkedin', value: 'LinkedIn', path: 'https://www.linkedin.com/in/marwen-ben-hamada-642b71133/' },
      { img: 'mdi-instagram', value: 'Instagram', path: 'https://www.linkedin.com/in/marwen-ben-hamada-642b71133/' }
    ]
  }),
  computed: {
    currentYear () {
      return new Date().getFullYear()
    }
  },
  methods: {
    redirect (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
