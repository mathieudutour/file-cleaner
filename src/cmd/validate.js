import { UI, getSelectedDocument } from "sketch";
import { validateAll } from "../validators";

export default function validate() {
  const result = validateAll(getSelectedDocument());
  if (result.success) {
    UI.message(`😍 Looks good!`);
  } else {
    UI.message(`‼️ ${result.message}`);
  }
}
