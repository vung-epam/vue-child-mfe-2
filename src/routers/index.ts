import { authGuard } from '@auth0/auth0-vue';
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/shared',
      name: 'home',
      component: () => import('../features/ManageUser/pages/Home.page.vue'),
    },
    {
      path: '/shared/test',
      name: 'test',
      component: () => import('../features/ManageUser/pages/Test.Page.vue'),
    },
    {
      path: '/shared/user',
      beforeEnter: authGuard,
      children: [
        {
          path: 'edit',
          name: 'edit-user',
          component: () => import('../features/ManageUser/pages/Edit.Page.vue'),
        },
        {
          path: 'list',
          name: 'list-user',
          component: () => import('../features/ManageUser/pages/List.Page.vue'),
        },
        {
          path: 'create',
          name: 'create-user',
          component: () =>
            import('../features/ManageUser/pages/Create.Page.vue'),
        },
        {
          path: ':id',
          name: 'view-user',
          component: () => import('../features/ManageUser/pages/View.Page.vue'),
        },
      ],
    },
  ],
});

export { router };
