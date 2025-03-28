import "@/helpers/latex/latex2Docx";
import { AlignmentType, Paragraph, Document, Footer, Header, HeadingLevel, LineRuleType, Packer, PageNumber, PageOrientation, Tab, TabStopPosition, TabStopType, TextRun, convertMillimetersToTwip } from "docx";
Object.assign(Array.prototype, {
  toParagraphArray(images) {
    return this.map((m, i) => {
      return `${i + 1}). ${m}`.latex2Docx(images);
    });
  },
});

Object.assign(Array.prototype, {
  createDocx(images) {
    const paragraphs = this.toParagraphArray(images);
    const doc = new Document({
      creator: "Krishna",
      description: "Math Question Paper generated from web",
      title: "Math Question Paper",
      styles: {
        default: {
          heading1: {
            run: {
              color: "9db59d",
              italics: false,
              size: 40,
              bold: true,
            },
          },
          heading2: {
            run: {
              color: "5d615d",
              bold: true,
              size: 36,
            },
          },
          paragraph: {
            id: "Normal",
            name: "Normal",
            quickFormat: true,
            spacing: { before: 28 * 72 * 0.1, after: 28 * 72 * 0.05, line: 288, lineRule: LineRuleType.AUTO },
            run: {
              size: 28,
            },
          },
        },

        paragraphStyles: [
          {
            id: "normalPara",
            name: "Normal Para",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 28,
            },
            paragraph: {
              alignment: AlignmentType.LEFT,
              spacing: { before: 28 * 72 * 0.1, after: 28 * 72 * 0.05, line: 288, lineRule: LineRuleType.AUTO },
            },
          },
          {
            id: "italicPara",
            name: "Italic Para",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              italics: true,
              color: "708090",
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
              spacing: { before: 28 * 72 * 0.1, after: 28 * 72 * 0.05, line: 336, lineRule: LineRuleType.AUTO },
            },
          },
        ],
      },
      sections: [
        {
          headers: {
            default: new Header({
              children: [new Paragraph({ text: "Latex to Docx Conversion", heading: HeadingLevel.HEADING_1 })],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      children: ["Page Number: ", PageNumber.CURRENT],
                    }),
                    new TextRun({
                      children: [" to ", PageNumber.TOTAL_PAGES],
                    }),
                    new TextRun({
                      children: [new Tab(), "Docx Sample "],
                    }),
                  ],
                  tabStops: [
                    {
                      type: TabStopType.RIGHT,
                      position: TabStopPosition.MAX,
                    },
                  ],
                  style: "normalPara",
                }),
              ],
            }),
          },
          properties: {
            page: {
              size: {
                orientation: PageOrientation.PORTRAIT,
                height: convertMillimetersToTwip(297),
                width: convertMillimetersToTwip(210),
              },
            },
          },
          children: [
            ...paragraphs,
            /*  new Paragraph({
              children: math,
              style: "normalPara",
            }), */
            new Paragraph({ text: "******** --------- ******** End of the sample ******** --------- ********", style: "italicPara" }),
          ],
        },
      ],
    });
    return Packer.toBlob(doc);
  },
});
