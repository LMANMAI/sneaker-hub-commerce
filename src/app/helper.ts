import { ISneaker } from "../interfaces";

function filterByGender(sneakers: ISneaker[], gender: string) {
  return sneakers.filter((item) => item.genre === gender);
}

function filterByBrand(sneakers: ISneaker[], brand: string) {
  return sneakers.filter((item) => item.brand === brand);
}

export { filterByGender, filterByBrand };
