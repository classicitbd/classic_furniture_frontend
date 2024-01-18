export const constructQueryString = (queryParams) => {
  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined)
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&");

  return queryString.length > 0 ? `all?${queryString}` : "all";
};
