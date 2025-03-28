export function formatXMLString(text) {
  return text
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/>\s+</g, "><");
}
