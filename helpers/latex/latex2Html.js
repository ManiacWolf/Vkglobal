import mathjax from "mathjax";
import "./latexify";
Object.assign(String?.prototype, {
  latex2Html(images) {
    const FILES = [...(images ?? [])];
    if (this) {
      const showImage = (filename) => {
        const FILE = FILES?.filter((f) => f.name === filename)[0]?.file;
        if (FILE) {
          return URL.createObjectURL(FILE);
        }
        return "image.jpg";
      };
      const parsed = this.Latexify();
      const result = parsed
        ?.map((p, i, arr) => {
          if (p.type === "text" && !p.line_break) {
            return p.content;
          }
          if (p.type === "text" && p.line_break) {
            return "<br/>";
          }
          if (p.type === "math" && !p.display) {
            return MathJax.tex2mml(p.content, { display: p.display });
          }
          if (p.type === "math" && p.display) {
            return `<div style="margin:.25rem auto">${MathJax.tex2mml(p.content, { display: p.display })}</div>`;
          }
          if (p.type === "graphics") {
            //return `<div style="display:block; margin:.25rem auto; max-width:300px"> <img style="width:100%; height:auto" src= ${showImage(p.content)} /></div>`;
            return `<div style="display:block; margin:.25rem auto; max-width:200px"> <img style="width:100%; height:auto" src="${process.env.CDN_SERVER}/${p.content}.jpg" /></div>`;
          }
        })

        .join("");
      return result;
    }
  },
});
