import { ISneaker } from "../interfaces";

function filterByGender(sneakers: ISneaker[], gender: string) {
  return sneakers.filter((item) => item.genre === gender);
}

function filterByBrand(sneakers: ISneaker[], brand: string) {
  console.log(sneakers);
  let array = sneakers.filter((item) => item.brand === brand && item);
  console.log(array);
  return array;
}

export { filterByGender, filterByBrand };
