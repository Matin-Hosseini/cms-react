import removeDuplicateObjectsFromArray from "./funcs/removeDuplicatedObjectsFromArray";

const createUserPages = (userPermissions, allPages) => {
  const userPermissionIDs = userPermissions.map(
    (permission) => permission.permission_Id
  );

  const userPages = [];

  userPermissionIDs.forEach((permission) => {
    allPages.forEach((page) => {
      const pagePermissions = page.permissionIDs;
      if (pagePermissions.includes(permission)) {
        userPages.push(page);
      }
    });
  });

  const pagesWithoutDuplicate = removeDuplicateObjectsFromArray(userPages);
  pagesWithoutDuplicate.sort((a, b) => a.id - b.id);

  return pagesWithoutDuplicate;
};

export default createUserPages;
