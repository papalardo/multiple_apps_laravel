import Vue from 'vue'

// Use global
window._ = require('lodash');
window.$ = window.jQuery = require('jquery')
window.swal = require('sweetalert2');
window.moment = require('moment');

// App js
require('@/assets/js/bootstrap.min.js')
require('@/assets/js/light-bootstrap-dashboard.js')
require('@/assets/js/bootstrap-notify.js')
require('@/assets/js/demo.js')


// Global components
    //Imports
    import Paginate from '@/components/Pagination'
    import MainLoader from '@/components/loading/MainLoader'

    // Use
    Vue.component('paginate', Paginate)
    Vue.component('main-loader', MainLoader)

//Diretives
    // Imports
    import { VueMaskDirective } from 'v-mask'

    // Use
    Vue.directive('mask', VueMaskDirective);

// Others
    // Imports
    import Prototypes from './plugins/prototypes.js'
    import VeeValidate, { Validator } from 'vee-validate';
    import ptBr from 'vee-validate/dist/locale/pt_BR';

    // Use
    Vue.use(Prototypes)

    Validator.localize('pt_BR', ptBr)
    Validator.extend('phone', {
    getMessage: field => 'Número inválido',
    validate: value => {
            var strongRegex = new RegExp(/^\([0-9]{2}\)\s[0-9]{1}\s[0-9]{4}\-[0-9]{4}/);
            return strongRegex.test(value);
        }
    },{
      immediate: false,
      hasTarget: true
    });
    Vue.use(VeeValidate);

// Auth
import router from './router'
Vue.router = router
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'type',
});

// Desative dev message
Vue.config.productionTip = false
