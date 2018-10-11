<template lang="html">
    <div class="sidebar" data-color="azure" data-image="assets/img/sidebar-5.jpg">
    <!--   you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple" -->
      <div class="sidebar-wrapper">
            <div class="logo">
                <a href="#" class="simple-text">
                    Metro
                </a>
            </div>

            <ul class="nav">
                <li>
                    <router-link to="/catalog">
                        <i class="pe-7s-notebook"></i>
                        <p>Catálogo</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/mural">
                        <i class="pe-7s-note2"></i>
                        <p>Mural</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/users">
                        <i class="pe-7s-users"></i>
                        <p>Usuários</p>
                    </router-link>
                </li>
            </ul>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.sidebar .nav a.active {
    color: #FFFFFF;
    opacity: 1;
    background: rgba(255, 255, 255, 0.23);
}
</style>
