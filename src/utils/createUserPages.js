import removeDuplicateObjectsFromArray from "./funcs/removeDuplicatedObjectsFromArray";

const createUserPages = (userPermissions, allPages) => {
  const userPages = [];

  userPermissions.forEach((perm) => {
    allPages.forEach((page) => {
      if (page.permissions.includes(perm.permission_Name)) {
        userPages.push(page);
      }
    });
  });

  const pagesWithoutDuplicate = removeDuplicateObjectsFromArray(userPages);
  pagesWithoutDuplicate.sort((a, b) => a.id - b.id);

  return pagesWithoutDuplicate;
};

export default createUserPages;
