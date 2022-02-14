import Vue from 'vue'
import Router from 'vue-router'
import { stringifyQuery, parseQuery } from '@/utils/query'
import basicRoute from '@/route/basicRoute'
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(Router)

export const constantRoutes = basicRoute

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    stringifyQuery: stringifyQuery,
    parseQuery: parseQuery,
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
