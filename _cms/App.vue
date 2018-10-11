<template>
    <div id="app">
        <main-loader v-show="loading"/>
        <transition name="fade">
            <component :is="layout" v-show="!loading">
                <router-view/>
            </component>
        </transition>
    </div>
</template>

<script>
import { DefaultLayout, CleanLayout } from './layout'
export default {
    components: {
        DefaultLayout,
        CleanLayout,
    },
    data: () => ({
        loading: false
    }),
    mounted() {
        console.log(this.$route);
    },
    computed: {
        layout() {
            let foundLayout
            this.$route.matched.find(e => e.meta.layout ? foundLayout = e.meta.layout : '')
            return (foundLayout || 'default') + '-layout';
        }
    }
}
</script>

<style lang="scss">
@import './assets/css/bootstrap.min.css';
@import './assets/css/animate.min.css';
@import './assets/css/light-bootstrap-dashboard.css';
@import './assets/css/pe-icon-7-stroke.css';
@import './assets/css/demo.css';
</style>
