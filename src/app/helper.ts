import { ISneaker } from "../interfaces";

function filterByGender(sneakers: ISneaker[], gender: string) {
  return sneakers.filter((item) => item.genre === gender);
}

function filterByBrand(sneakers: ISneaker[], brand: string) {
  let array = sneakers.filter((item) => item.brand === brand && item);
  return array;
}

export { filterByGender, filterByBrand };
