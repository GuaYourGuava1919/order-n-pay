const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/order",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/OrderMeal.vue") },
    ],
  },
  {
    path: "/paythebill",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PaytheBill.vue") },
    ],
  },
  {
    path: "/manager",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ManagerZone.vue") },
    ],
  },

  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
