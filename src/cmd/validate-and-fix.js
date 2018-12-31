import { UI, getSelectedDocument } from "sketch";
import { getMasterPage } from "../utils";
import { validateAll } from "../validators";
import { autoAlignArtboards } from "../artboards";
import { markWipRows } from "../wip-rows";

export default function validateAndFix() {
  const document = getSelectedDocument();
  const result = validateAll(document);
  if (!result.success) {
    UI.message(`‼️ ${result.message}`);
    return;
  }

  const master = getMasterPage(document);

  // Fix artboard alignment on the Master page
  autoAlignArtboards(master);

  // Colour the backgrounds of rows with WIP symbols
  markWipRows(document, master);
}
