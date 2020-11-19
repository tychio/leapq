// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App'
import VueTouch from 'vue-touch'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: 'https://2784769aa82e450fb3944e49a332cba7@o479270.ingest.sentry.io/5523645',
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true
    }),
    new Integrations.BrowserTracing()
  ],

  tracesSampleRate: 1.0
})

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
