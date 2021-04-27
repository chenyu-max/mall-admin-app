// 存储的是角色所对应的权限名称
const roleToRouter = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }, {
    name: 'ProductEdit',
  }],
};

/**
 * 过滤掉没有权限的路由
 * @param role
 * @param routes
 * @returns {Array}
 */
export default function getMenuRoute(role, routes) {
  const allowRoutesName = roleToRouter[role].map((item) => item.name);
  return routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
}
