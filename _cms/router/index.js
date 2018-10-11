function load(component) {
    return require(`../views/${component}.vue`)
}

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    base: 'cms/',
    mode: 'history',
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes: [
        {
            path: '/',
            redirect: '/catalog',
            component: { render: c => c('router-view') },
            meta: {
                auth: true
            },
            children: [
                {
                    path: '/catalog',
                    component: { render: c => c('router-view') },
                    meta: {
                        title: 'Catálogo'
                    },
                    children: [
                        {
                            path: '/',
                            name: 'CatalogList',
                            component: load('Catalog/List'),
                        },
                        {
                            path: 'insert',
                            name: 'CatalogInsert',
                            component: load('Catalog/Edit'),
                        },
                        {
                            path: ':id',
                            name: 'CatalogUpdate',
                            component: load('Catalog/Edit'),
                        }
                    ]
                },
                {
                    path: '/users',
                    component: { render: c => c('router-view') },
                    meta: {
                        title: 'Usuários'
                    },
                    children: [
                        {
                            path: '/',
                            name: 'UserList',
                            component: load('Users/List'),
                        },
                        {
                            path: 'insert',
                            name: 'UserInsert',
                            component: load('Users/Edit'),
                        },
                        {
                            path: ':id',
                            name: 'UserUpdate',
                            component: load('Users/Edit'),
                        }
                    ]
                },
                {
                    path: '/mural',
                    component: { render: c => c('router-view') },
                    meta: {
                        title: 'Mural'
                    },
                    children: [
                        {
                            path: '/',
                            name: 'MuralList',
                            component: load('Mural/List'),
                        },
                    ]
                },
            ]
        },
        {
            path: '/login',
            name: 'Login',
            meta: { layout: 'clean' },
            component: load('Login')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.path == '/logout') {
        localStorage.clear();
        next({
          path: '/login'
        })
    } else {
        if(to.name) Vue.prototype.$method = (to.name.toLowerCase().search('insert') > -1) ? 'insert' : (to.name.toLowerCase().search('list') > -1) ? 'list' : 'update'
        next()
    }
})

export default router
