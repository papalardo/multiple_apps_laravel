<template>
    <div id="app">
        <div class="wrapper">
            <Navbar/>
            <div class="main-panel">
  		        <HeaderBar/>
                <div class="content">
                    <main-loader v-show="loading"/>
                    <router-view/>
                </div>
                <FooterBar/>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar'
import HeaderBar from './components/HeaderBar'
import FooterBar from './components/FooterBar'

export default {
    name: 'App',
    components: {
        Navbar,
        HeaderBar,
        FooterBar
    },
    data: () => ({
        loading: false
    }),
    mounted() {
        this.$bus.$on('loaderDefaultLayout', (res) => this.loading = !!res )
    }
}
</script>
