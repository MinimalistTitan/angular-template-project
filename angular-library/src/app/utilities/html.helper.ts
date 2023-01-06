
//? interact with Html element (or other element types ) helper.
export class HTMLHelper {
  static setChild(
    collection: HTMLCollectionOf<Element>,
    set: (element: Element) => void
  ) {
    for (let i = 0; i < collection.length; i++) {
      set(collection[i]);
    }
  }
}
