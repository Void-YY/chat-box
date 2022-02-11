/* Layout */
import Layout from '@/layout'
const basicRoute = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/Home"),
        name: "Home",
        meta: { title: "Home" },
      },
      {
        path: "chat",
        component: () => import("@/views/Chat"),
        name: "Chat",
        meta: { title: "Chat" },
      },
    ],
  },
  // {
  //   path: '/404',
  //   component: () => import('./404'),
  //   hidden: true,
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('./dashboard/index'),
  //       name: 'ホーム',
  //       meta: { title: 'ホーム', icon: 'dashboard' },
  //     },
  //   ],
  // },
];

/* Layout */
export default basicRoute;
