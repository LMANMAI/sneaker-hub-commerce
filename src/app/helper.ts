import { ISneaker } from "../interfaces";

function filterByGender(sneakers: ISneaker[], gender: string) {
  return sneakers.filter((item) => item.genre === gender);
}

function filterById(sneakers: ISneaker[], id: string) {
  return sneakers.filter((item) => item._id === id);
}
export { filterByGender, filterById };
