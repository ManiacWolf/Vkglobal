import mathjax from "mathjax";
import { convertMathMl2Math } from "./mathml2math";

export function convertLatex2Math(latexString) {
  const mathMlString = latex2MathMl(latexString);
  return convertMathMl2Math(mathMlString);
}

function latex2MathMl(latexString) {
  if (typeof latexString !== "string") {
    throw "invalid params for latex2MathMl";
  }

  return MathJax.tex2mml(latexString);
}
