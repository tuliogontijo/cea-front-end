export const isEmpty = (object) => {
  for (let _obj in object) return false;
  return true;
}