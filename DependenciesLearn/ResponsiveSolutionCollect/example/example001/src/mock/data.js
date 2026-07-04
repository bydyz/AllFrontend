export const menus = [
  { id: 1, name: '总览', path: '/overview', icon: 'DataBoard', parentId: 0 },
  { id: 2, name: '菜单控制', path: '/menu', icon: 'Menu', parentId: 0 },
  { id: 3, name: '角色管理', path: '/role', icon: 'UserFilled', parentId: 0 },
  { id: 4, name: '用户管理', path: '/user', icon: 'User', parentId: 0 },
  { id: 5, name: '系统设置', path: '/settings', icon: 'Setting', parentId: 0 }
]

export const roles = [
  { id: 1, name: '超级管理员', description: '拥有所有权限', menuIds: [1, 2, 3, 4, 5] },
  { id: 2, name: '管理员', description: '拥有部分管理权限', menuIds: [1, 3, 4] },
  { id: 3, name: '普通用户', description: '仅查看权限', menuIds: [1] }
]

export const users = [
  { id: 1, username: 'admin', password: '123456', role: '超级管理员', roleId: 1, status: 1, createTime: '2024-01-01' },
  { id: 2, username: 'manager', password: '123456', role: '管理员', roleId: 2, status: 1, createTime: '2024-02-15' },
  { id: 3, username: 'user', password: '123456', role: '普通用户', roleId: 3, status: 1, createTime: '2024-03-20' },
  { id: 4, username: 'guest', password: '123456', role: '普通用户', roleId: 3, status: 0, createTime: '2024-04-10' }
]

export const statistics = {
  totalUsers: 4,
  totalRoles: 3,
  totalMenus: 5,
  activeUsers: 3
}
