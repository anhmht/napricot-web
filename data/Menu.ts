export interface Menu {
  name: string
  icon: string
  route: string
  children?: Menu[]
  activePath?: string[]
}

export const menu: Menu[] = [
  {
    name: 'Dashboard',
    icon: 'icon-home',
    route: '/dashboard'
  },
  {
    name: 'Categories',
    icon: 'icon-categories',
    route: '/dashboard/category'
  },
  {
    name: 'Products',
    icon: 'icon-t-shirt',
    route: '/dashboard/product'
  },
  {
    name: 'Users',
    icon: 'icon-team-line',
    route: '/dashboard/user'
  },
  {
    name: 'Posts',
    icon: 'icon-post',
    route: '/dashboard/post',
    activePath: ['dashboard-post-create', 'dashboard-post-id']
  },
  {
    name: 'Links',
    icon: 'icon-link',
    route: '/dashboard/link'
  },
  {
    name: 'Orders',
    icon: 'icon-money',
    route: '/dashboard/order'
  },
  {
    name: 'Contacts',
    icon: 'icon-mail',
    route: '/dashboard/contact'
  }
]
