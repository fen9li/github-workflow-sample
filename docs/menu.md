# Menu Guide

- [Highlight](#highlight-menu)

## Highlight menu

### Simple example

menu object:

```js
{
  title: 'Dashboard',
  path: '/dashboard',
  menu: 'dashboard',
}
```

route meta object:

```js
meta: {
  menu: 'dashboard',
}
```

### With childrens

menu object:

```js
{
  title: 'Settings',
  menu: 'settings',
  children: [{
    title: 'Payment Settings',
    path: '/settings/payment',
    menu: 'settings-payment',
  }]
}
```

route meta object for subroute:

```js
meta: {
  nested: true,
  menu: 'settings',
  submenu: 'settings-payment',
}
```

### With dynamic childrens

menu object:

```js
{
  title: 'Feed Updates',
  path: '/feed-updates',
  menu: 'feed-updates',
  children: feeds.map(feed => ({
    title: feed.name,
    path: `/feed-updates/${ feed.slug }`,
    menu: feed.slug,
  })),
}
```

route meta object (app-sidebar takes submenu from slug):

```js
{
  path: '/feed-updates',
  name: 'feed-updates',
  component: () => lazy(import('./views/feed-updates')),
  props: true,
  meta: {
    menu: 'feed-updates',
  },
}, {
  path: '/feed-updates/:slug/:tab?',
  name: 'feed-update',
  component: () => lazy(import('./views/feed-update')),
  props: true,
  meta: {
    nested: true,
    menu: 'feed-updates',
  },
}
```
