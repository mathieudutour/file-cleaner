export function getMasterPage(document) {
  return document.pages.find(({ name }) => name === "Master");
}
