import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => lazy(import('./views/dashboard')),
      meta: {
        menu: 'dashboard',
      },
    },
    {
      path: '/providers',
      name: 'providers',
      component: () => lazy(import('./views/providers')),
      meta: {
        menu: 'providers',
      },
    },
    {
      path: '/providers/:id/:tab?',
      name: 'provider-details',
      component: () => lazy(import('./views/provider')),
      meta: {
        menu: 'providers',
      },
      props: true,
    },
    {
      path: '/provider-products',
      name: 'provider-products',
      component: () => lazy(import('./views/provider-products')),
      meta: {
        menu: 'provider-products',
      },
    },
    {
      path: '/provider-product/:id',
      name: 'provider-product',
      component: () => lazy(import('./views/provider-product')),
      props: true,
    },
    {
      path: '/provider-product/:id/edit',
      name: 'provider-product-edit',
      component: () => lazy(import('./views/provider-product/edit-provider-product.vue')),
      redirect: {
        name: 'provider-product-edit-product',
      },
      children: [
        {
          path: 'product',
          name: 'provider-product-edit-product',
          component: () => lazy(import('./views/provider-product/edit/product.vue')),
          props: true,
        },
        {
          path: 'price',
          name: 'provider-product-edit-price',
          component: () => lazy(import('./views/provider-product/edit/price.vue')),
          props: true,
        },
        {
          path: 'dimensions',
          name: 'provider-product-edit-dimensions',
          component: () => lazy(import('./views/provider-product/edit/dimensions.vue')),
          props: true,
        },
        {
          path: 'shipping',
          name: 'provider-product-edit-shipping',
          component: () => lazy(import('./views/provider-product/edit/shipping.vue')),
          props: true,
        },
      ],

    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: () => lazy(import('./views/suppliers')),
      meta: {
        menu: 'suppliers',
      },
    },
    {
      path: '/suppliers/:id/:tab?',
      name: 'supplier-details',
      component: () => lazy(import('./views/supplier')),
      meta: {
        menu: 'suppliers',
      },
    },
    {
      path: '/supplier-products',
      name: 'supplier-products',
      component: () => lazy(import('./views/supplier-products')),
      meta: {
        menu: 'supplier-products',
      },
    },
    {
      path: '/contracts',
      name: 'contracts',
      component: () => lazy(import('./views/contracts')),
      meta: {
        menu: 'contracts',
      },
    },
    {
      path: '/contracts/:id',
      name: 'contract-details',
      component: () => lazy(import('./views/contract')),
      props: true,
      meta: {
        menu: 'contracts',
      },
    },
    {
      path: '/product-categories',
      name: 'product-categories',
      component: () => lazy(import('./views/product-categories')),
      meta: {
        menu: 'product-categories',
      }
    },
    {
      path: '/product-categories/:id',
      name: 'product-category-details',
      component: () => lazy(import('./views/product-category-details')),
      props: true,
      meta: {
        menu: 'product-categories',
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
