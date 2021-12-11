import { RouteProps } from 'react-router-dom'
import loadable from '@loadable/component'

interface RouteConfig extends RouteProps {
  displayName: string
  navlinkPosition?: number // if defined and >= 0 display in AppBar navlink
}

interface LinkConfig extends RouteConfig {
  navlinkPosition: number
}

//! this config is used to map react-router routes, the order is important to match correct path
const routes: RouteConfig[] = [
  {
    path: '/analytics',
    component: loadable(() => import('src/routes/Analytics')),
    exact: true,
    displayName: 'Analytics',
    navlinkPosition: 0
  },
  {
    path: '/resourceAnalytics',
    component: loadable(() => import('src/routes/ResourceAnalytics')),
    exact: true,
    displayName: 'Resource Analytics',
    navlinkPosition: 0
  }
]

export const navLinks = (
  routes.filter((r) => typeof r.navlinkPosition === 'number' && r.navlinkPosition >= 0) as LinkConfig[]
).sort((a, b) => a.navlinkPosition - b.navlinkPosition)

export default routes
