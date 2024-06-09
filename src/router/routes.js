const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/IndexPage.vue") },
      { path: "/form", component: () => import("pages/FormFIlePage.vue") },
      { path: "/form/:id", component: () => import("pages/FormFIlePage.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("src/pages/IniciarSesionPage.vue"),
  },

  {
    path: "/register",
    component: () => import("src/pages/suscribeRegisterPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
