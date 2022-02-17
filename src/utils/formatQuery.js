export const formatQuery = (values) => {
  let query = "";

  for (let key in values) {
    query += `${key}=${values[key]}&`
  };

  return query || "";
};
