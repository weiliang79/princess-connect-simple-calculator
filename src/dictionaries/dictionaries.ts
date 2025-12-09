// import 'server-only';

// const dictionaries: { [key: string]: () => Promise<any> } = {
//       en: () => import('./en.json').then((module) => module.default),
//       tw: () => import('./tw.json').then((module) => module.default),
// }

// export const getDictionary = async (locale: string) => dictionaries[locale]();

import en from "./en.json";
import tw from "./tw.json";

export function getDict(locale: string) {
  return locale === "tw" ? tw : en;
}
