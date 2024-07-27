export interface Menu {
  name: string;
  icon: string;
  route?: string;
  children?: Menu[];
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
    route: '/dashboard/post'
  },
  {
    name: 'Orders',
    icon: 'icon-money',
    route: '/dashboard/order'
  },
  {
    name: 'Mail Template',
    icon: 'icon-mail',
    route: '/dashboard/mail-template'
  }
]
