function getArtboards(page) {
  return page.layers.filter(({ type }) => type === "Artboard");
}

export function artboardRowsByName(page) {
  const artboards = getArtboards(page);
  return artboards.reduce((rows, artboard) => {
    const number = parseInt(artboard.name.match(/\d+/)[0], 10);
    const rowName = String(number - (number % 100));
    const row = rows[rowName] || [];
    row.push(artboard);

    // eslint-disable-next-line no-param-reassign
    rows[rowName] = row.sort((a, b) => a.frame.x - b.frame.x);
    return rows;
  }, {});
}

function artboardRowsByPosition(page) {
  const artboards = getArtboards(page);

  // Find the row covers
  const rowCovers = [];
  for (let i = 0; i < artboards.length; i++) {
    const number = parseInt(artboards[i].name, 10);
    if (number % 100 === 0) {
      rowCovers.push(artboards[i]);
    }
  }

  // Sort the existing covers
  rowCovers.sort((a, b) => a.frame.y - b.frame.y);

  // Build up the rows, starting with their covers
  const rows = {};
  for (let i = 0; i < rowCovers.length; i++) {
    const rowName = ((i + 1) * 100).toString();
    rows[rowName] = [rowCovers[i]];
  }
  const yPositions = Object.entries(rows).map(([name, row]) => [
    name,
    row[0].frame.y,
  ]);

  // Add other artboards into the rows
  for (let i = 0; i < artboards.length; i++) {
    const artboard = artboards[i];

    // Skip row covers, obvs...
    if (rowCovers.some(rowCover => rowCover.id === artboard.id)) {
      continue;
    }

    const yPos = artboard.frame.y;

    let closestRow;
    let smallestDist = Infinity;
    for (const [rowName, rowYPos] of yPositions) {
      const yDist = Math.abs(yPos - rowYPos);
      if (yDist < smallestDist) {
        closestRow = rowName;
        smallestDist = yDist;
      }
    }

    rows[closestRow].push(artboards[i]);
  }

  // Sort rows by board x position
  Object.values(rows).forEach(row => row.sort((a, b) => a.frame.x - b.frame.x));
  return rows;
}

export function autoAlignArtboards(page) {
  const rows = artboardRowsByPosition(page);

  const rowNames = Object.keys(rows).sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10)
  );
  let y = 0;
  for (const rowName of rowNames) {
    const row = rows[rowName];
    let x = 0;
    let nextYOffset = 1000;
    let sequenceNumber = 0;

    for (const artboard of row) {
      // Make sure they're in the right order, so the list on the left is sorted
      artboard.moveToFront();

      // Update name
      const artboardNumber = parseInt(rowName, 10) + sequenceNumber;
      artboard.name = artboardNumber.toString();

      // Update artboard's position
      artboard.frame.x = x;
      artboard.frame.y = y;

      // Use the height of the largest artboard on this row to determine the
      // y-offset of the next row (plus a small buffer for labels)
      const height = artboard.frame.height + 100;
      if (height > nextYOffset) {
        // Snap to a 500 unit grid
        nextYOffset = height + (500 - (height % 500));
      }

      x += 500;
      sequenceNumber++;
    }
    y += nextYOffset;
  }
}
