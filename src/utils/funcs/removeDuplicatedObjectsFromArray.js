const removeDuplicateObjectsFromArray = (array) => {
  const mapFromArray = new Map(array.map((c) => [c.id, c]));

  return [...mapFromArray.values()];
};

export default removeDuplicateObjectsFromArray;
