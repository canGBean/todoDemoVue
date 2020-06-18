const getters = {
  roles: state => state.user.userInfo.roles,
  avatar: state => state.user.userInfo.avatar,
  permission_routes: state => state.permission.routes,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
};
export default getters;
