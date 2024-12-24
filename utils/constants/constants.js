module.exports = {
  ROLE_ADMIN: "Admin",
  ROLE_EDITOR: "Editor",
  ROLE_USER: "User",
  ROLES: {
    Admin: "Admin",
    User: "User",
    Editor: "Editor",
  },
  PERMISSION_VIEW_ALL_POSTS: ["Admin", "User", "Editor"],
  PERMISSION_VIEW_A_POST: ["Admin", "User", "Editor"],
  PERMISSION_ADD_A_POST: ["Admin", "Editor"],
  PERMISSION_UPDATE_A_POST: ["Admin", "Editor"],
  PERMISSION_DELETE_A_POST: ["Admin", "Editor"],
};
