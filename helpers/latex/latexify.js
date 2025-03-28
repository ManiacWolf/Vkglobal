Object.assign(String.prototype, {
  Latexify() {
    if (this) {
      const regularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^\$\\]*(?:\\.[^\$\\]*)*\$/g;
      const blockRegularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]/g;
      const graphicExpression = /\\includegraphics\[[^\]]*\]\{[^\}]*\}/gm;
      const graphicsFileExpression = /\\includegraphics(?:\[[^\]]*\])?\{([^\}]+)\}/gm;
      const stripDollars = (stringToStrip) => (stringToStrip[0] === "$" && stringToStrip[1] !== "$" ? stringToStrip.slice(1, -1) : stringToStrip.slice(2, -2));

      const getDisplay = (stringToDisplay) => (stringToDisplay.match(blockRegularExpression) ? true : false);
      /*
  const renderLatexString = (s, t) => {
    let renderedString;
    try {
      // returns HTML markup
      renderedString = katex.renderToString(s, t === "block" ? Object.assign({ displayMode: true }, options) : options);
    } catch (err) {
      console.error("couldn`t convert string", s);
      return s;
    }
    return renderedString;
  };*/

      const result = [];
      const rawString = this;
      const latexMatch = rawString.replace(/\n\r|\n|\r/gm, "").match(regularExpression);
      const stringWithoutLatex = rawString.replace(/\n\r|\n|\r/gm, "").split(regularExpression);

      if (latexMatch) {
        stringWithoutLatex.forEach((s, index) => {
          const graphicsMatch = s.match(graphicExpression);
          const stringMatch = s.split(graphicExpression);
          stringMatch.forEach((g, r) => {
            const lineBreaks = g.match(/\\\\/g);
            const lines = g.split(/\\\\/g);
            if (lineBreaks) {
              lines?.forEach((l, n) => {
                result.push({
                  content: l,
                  type: "text",
                  display: false,
                  line_break: false,
                });
                if (lineBreaks[n]) {
                  result.push({
                    content: "",
                    type: "text",
                    display: false,
                    line_break: true,
                  });
                }
              });
            } else {
              result.push({
                content: g,
                type: "text",
                display: false,
                line_break: false,
              });
            }

            if (graphicsMatch && graphicsMatch[r]) {
              result.push({
                content: graphicsMatch[r].replace(graphicsFileExpression, "$1"),
                type: "graphics",
                display: true,
                line_break: true,
              });
            }
          });
          /* result.push({
          string: s.trim().match(graphicExpression),
          type: "text",
          display: false,
          line_break: s.match(/\\\\/g) ? true : false,
        }); */
          if (latexMatch[index]) {
            result.push({
              content: stripDollars(latexMatch[index]),
              type: "math",
              display: getDisplay(latexMatch[index]),
              line_break: getDisplay(latexMatch[index]),
            });
          }
        });
      } else {
        const lineBreaks = rawString.match(/\\\\/g);
        const lines = rawString.split(/\\\\/g);
        if (lineBreaks) {
          lines?.forEach((l, n) => {
            result.push({
              content: l,
              type: "text",
              display: false,
              line_break: false,
            });
            if (lineBreaks[n]) {
              result.push({
                content: "",
                type: "text",
                display: false,
                line_break: true,
              });
            }
          });
        } else {
          result.push({
            content: rawString,
            type: "text",
            display: false,
            line_break: false,
          });
        }
      }
      /*
  const processResult = (resultToProcess) => {
    const newResult = resultToProcess.map((r) => {
      if (r.type === "text") {
        return r.string;
      }
      return renderLatexString(r.string, r.type);
    });

    return newResult;
  };*/

      // Returns list of spans with latex and non-latex strings.
      //return processResult(result);
      return result;
    }
  },
});
