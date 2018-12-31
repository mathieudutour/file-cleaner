import { artboardRowsByName } from "./artboards";

const wipSymbolRegex = /\bWIP$/;
const defaultArtboardColor = "#000000FF";
const wipArtboardColor = "#F43951FF";

function findWipRows(document, page) {
  const symbolMaster = document
    .getSymbols()
    .find(s => s.name.match(wipSymbolRegex));

  if (!symbolMaster) {
    console.log("Couldn't find WIP symbol");
    return [];
  }

  const wipRows = [];
  for (const instance of symbolMaster.getAllInstances()) {
    const instancePage = instance.getParentPage();
    const artboard = instance.getParentArtboard();

    if (artboard && instancePage.isEqualTo(page)) {
      const boardNumber = parseInt(artboard.name, 10);
      const rowName = (boardNumber - (boardNumber % 100)).toString();
      if (wipRows.indexOf(rowName) === -1) {
        wipRows.push(rowName);
      }
    }
  }
  return wipRows;
}

export function markWipRows(document, page) {
  const wipRows = findWipRows(document, page);
  const rows = artboardRowsByName(page);
  for (const rowNumber of Object.keys(rows)) {
    const artboard = rows[rowNumber][0];
    if (wipRows.includes(rowNumber)) {
      artboard.background.color = wipArtboardColor;
    } else if (artboard.background.color === wipArtboardColor) {
      // This conditional prevents us from e.g. changing green "approved"
      // artboards back to black
      artboard.background.color = defaultArtboardColor;
    }
  }
}
