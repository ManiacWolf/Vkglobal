import { convertLatex2Math } from "@/maths";
import "./latexify";
import { ImageRun, Paragraph, TextRun } from "docx";
Object.assign(String.prototype, {
  latex2Docx(images) {
    const FILES = [...(images ?? [])];
    const getImageProps = (filename) => {
      const FILE = FILES?.filter((f) => f.name === filename)[0] ?? null;
      if (FILE) {
        return FILE;
      }
      return null;
    };
    const getImageBuffer = (filename) => {
      const FILE = FILES?.filter((f) => f.name === filename)[0];
      if (FILE) {
        const reader = new FileReader();
        let base64;
        reader.onloadend = function (e) {
          base64 = e.target.result;
          return new Buffer.from(base64, "base64");
        };
        reader.readAsDataURL(FILE.file);
      }
    };
    const parsed = this.Latexify();
    const paragraph = parsed?.map((p, i, arr) => {
      if (p.type === "text" && !p.line_break) {
        return new TextRun(`${p.content} `);
      }
      if (p.type === "text" && p.line_break) {
        return new TextRun({ break: 1 });
      }
      if (p.type === "math" && !p.line_break) {
        return convertLatex2Math(p.content);
      }
      if (p.type === "math" && p.line_break) {
        return [new TextRun({ break: 1 }), convertLatex2Math(p.content)];
      }
      if (p.type === "graphics") {
        return [
          new TextRun({ break: 1 }),
          new ImageRun({
            type: "jpg",
            data: getImageBuffer(p.content),
            transformation: {
              width: 200,
              height: 200,
            },
          }),
          new TextRun({ break: 1 }),
        ];
      }
    });

    return new Paragraph({
      children: paragraph.flat(Infinity),
      style: "normalPara",
    });
  },
});
