import Vue from 'vue'
import * as helpers from '@/utils/helpers'

export default {
    install(Vue, options) {
        Vue.prototype.$bus = new Vue()
        Vue.prototype.$verifyForm = function() {
            return this.$validator.validate()
            .then(result => {
                if (!result) {
                    swal({
                        type: 'warning',
                        title: 'Ops..',
                        text: 'Verifique os dados no formulário e tente novamente',
                        timer: 4000
                    })
                    return false
                } else {
                    return true
                }
            });
        },
        Vue.prototype.$clearObj = function(obj) {
            for(let value in obj) {
                switch (typeof obj[value]) {
                    case 'string':
                        obj[value] = '';
                        break;
                    case 'number':
                        obj[value] = 0
                        break;
                    case 'object':
                          Array.isArray(obj[value]) ? obj[value] = [] : obj[value] = {}
                        break;
                }
                return obj
            }
        }
        Vue.prototype.$helpers = helpers;
    }
}
