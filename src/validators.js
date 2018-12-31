import { getMasterPage } from "./utils";

export function validateMasterPresence(document) {
  if (!getMasterPage(document)) {
    return { success: false, message: "Missing page 'Master'" };
  }
  return { success: true };
}

export function validatePageNames(document) {
  const allowedNames = ["Master", "Symbols"];
  const { pages } = document;
  for (let i = 0; i < pages.length; i++) {
    const { name } = pages[i];
    if (allowedNames.indexOf(name) === -1) {
      return { success: false, message: `Invalid page name '${name}'` };
    }
  }
  return { success: true };
}

export function validateArtboardNames(document) {
  const master = getMasterPage(document);
  const artboards = master.layers.filter(({ type }) => type === "Artboard");
  const artboardsByName = {};
  for (let i = 0; i < artboards.length; i++) {
    const { name } = artboards[i];
    if (artboardsByName[name]) {
      return { success: false, message: `Duplicate artboard name '${name}'` };
    }
    artboardsByName[name] = name;

    if (!name.match(/^\d{3,4}(\.[A-Z]{1,2})?/)) {
      return { success: false, message: `Invalid artboard name '${name}'` };
    }
  }
  return { success: true };
}

const validators = [
  validateMasterPresence,
  validatePageNames,
  validateArtboardNames,
];
export default validators;

export function validateAll(document) {
  for (const validator of validators) {
    const result = validator(document);
    if (!result.success) {
      return result;
    }
  }
  return { success: true };
}
