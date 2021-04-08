import { atom } from "recoil";

export const plsLoginAlert = atom({
  key: "plsLoginAlert",
  default: false,
});
export const addedMovieAlert = atom({
  key: "addedMovieAlert",
  default: false,
});
export const removeMovieAlert = atom({
  key: "removeMovieAlert",
  default: false,
});
