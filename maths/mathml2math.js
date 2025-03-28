import { mml2omml } from "@seewo-doc/mathml2omml";
import { convertOmml2Math } from "./omml2math";

export function convertMathMl2Math(mathMlString) {
  const ommlString = convertMathMl2Omml(mathMlString);
  return convertOmml2Math(ommlString);
}

function convertMathMl2Omml(mml) {
  const ommlString = mml2omml(mml, { disableDecode: true });
  return ommlString;
}
