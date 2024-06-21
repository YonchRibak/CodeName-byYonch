import WikiObj from "@/Models/WikiObj";

export function sortByExtract(wikiObjArr: WikiObj[]): WikiObj[] {
  // because only some elements return with an extract, i want those that have one to come first.
  // this function sorts the array according to the existence of an extract.
  function compare(a: WikiObj, b: WikiObj): number {
    if (a.extract && !b.extract) {
      return -1; // a comes first if it has an extract
    } else if (!a.extract && b.extract) {
      return 1; // b comes first if it has an extract
    } else {
      return 0; // leave the order unchanged if both have or don't have an extract
    }
  }

  return wikiObjArr.sort(compare);
}
