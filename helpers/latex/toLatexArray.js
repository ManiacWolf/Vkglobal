Object.assign(String.prototype, {
  toLatexArray() {
    const regex = /\\begin{document}(.*?)\\end{document}/s;

    // Apply the regex to the LaTeX content
    const match = this.split(regex);
    let output = [];
    // If a match is found, return the extracted content
    if (match) {
      // The content will be in the second capturing group (match[1])
      output = match[1]
        ?.split(/\r\n|\r\r|\n\n/gs)
        ?.map((m) => {
          return m.trim();
        })
        .filter((f) => f.length > 0);
    } else {
      // If no document is found, return null
      output = null;
    }
    return output;
  },
});
