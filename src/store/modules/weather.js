
const state = () => ({
  city: '',
  userCredentials: {
    api_key: 'fbad7115580b97abe40824796e9e4f15',
    path: 'https://api.openweathermap.org/data/2.5/'
  },
  currentWeather: null,
  color: 'orange',
  minDailyWeather: [],
  maxDailyWeather: [],
  unitTemperature: window.localStorage.getItem('tempUnit') ? window.localStorage.getItem('tempUnit') : 'celsius',
  errorOccured: false,
  favoriteCities: window.localStorage.getItem('favoriteCities') ? JSON.parse(window.localStorage.getItem('favoriteCities')) : { cities: [] }
})

const getters = {
  getUserCredentials: state => () => {
    return state.userCredentials
  }
}

const mutations = {
  fetchWeather (state, { data, city }) {
    if (data.cod === 200) {
      state.city = city
      state.currentWeather = data
      state.minDailyWeather = []
      state.maxDailyWeather = []
    }
  },
  fetchDailyWeather (state, { minTemp, maxTemp }) {
    state.minDailyWeather = minTemp.splice(1)
    state.maxDailyWeather = maxTemp.splice(1)
  },
  addToFavoriteList (state, city) {
    if (state.favoriteCities.cities.indexOf(city) === -1) {
      state.favoriteCities.cities.push(city)
    }
    window.localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities))
  },
  setUnitTemp (state, unitTemp) {
    state.unitTemperature = unitTemp
  },
  errorOccured (state, error) {
    state.errorOccured = error
  },
  deleteFromFavList (state, newFavList) {
    state.favoriteCities = { cities: newFavList }
    window.localStorage.setItem('favoriteCities', JSON.stringify({ cities: newFavList }))
  }
}

const actions = {
  fetchDailyWeather ({ commit }, { path, city, apiKey }) {
    fetch(`${path}forecast?q=${city}&units=imperial&APPID=${apiKey}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        const minWeather = []
        const maxWeather = []
        const next5DaysWeather = res.list.reduce(function (acc, obj) {
          const cle = new Date(obj.dt_txt).getDate()
          if (!acc[cle]) {
            acc[cle] = []
          }
          acc[cle].push(obj)
          return acc
        }, {})
        for (const key in next5DaysWeather) {
          const element = next5DaysWeather[key]
          const minValue = element.filter(item => item.main.temp === Math.min(...(element.map(d => d.main.temp))))[0]
          const maxValue = element.filter(item => item.main.temp === Math.max(...(element.map(d => d.main.temp))))[0]
          minWeather.push(minValue)
          maxWeather.push(maxValue)
        }
        commit('fetchDailyWeather', { minTemp: minWeather, maxTemp: maxWeather })
      })
      .catch(() => {
        commit('errorOccured', true)
      })
  },
  fetchWeather ({ commit, dispatch, getters }, city) {
    fetch(`${getters.getUserCredentials().path}weather?q=${city}&units=imperial&APPID=${getters.getUserCredentials().api_key}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        commit('fetchWeather', { data: res, city: city })
        dispatch('fetchDailyWeather', { path: getters.getUserCredentials().path, city: city, apiKey: getters.getUserCredentials().api_key })
      })
      .catch(() => {
        commit('errorOccured', true)
      })
  },
  fetchTodaysWeather ({ commit, dispatch, getters }) {
    let long
    let lat
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.locationFound = true
        long = position.coords.longitude
        lat = position.coords.latitude
        fetch(`${getters.getUserCredentials().path}weather?lat=${lat}&lon=${long}&units=imperial&APPID=${getters.getUserCredentials().api_key}`)
          .then(res => {
            return res.json()
          }).then(res => {
            commit('fetchWeather', { data: res, city: null })
            dispatch('fetchDailyWeather', { path: getters.getUserCredentials().path, city: res.name, apiKey: getters.getUserCredentials().api_key })
          }).catch(error => {
            console.log(error)
          })
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
