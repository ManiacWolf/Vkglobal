import { Fragment, useEffect, useState } from "react";
import { Button, ButtonGroup, Grid2, TextField } from "@mui/material";
import { CloudUpload, Download } from "@mui/icons-material";
import Header from "@/components/Header";
import { VisuallyHiddenInput } from "@/components/Input";
import { saveAs } from "file-saver";
import "@/helpers/latex/latex2Html";
import "@/helpers/latex/toLatexArray";
import "@/helpers/docx";
import { SmartMindIcon } from "@/components/SmartIcons";
export default function Latex() {
  const [latexArray, setLatexArray] = useState();
  const [imageArray, setImageArray] = useState();

  const handleLatexFileChange = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target.result;
      setLatexArray(content.toLatexArray());
    };
    fileReader.readAsText(file);
  };
  const handleImagesChange = (files) => {
    const array = [];
    for (const file of files) {
      array.push({ file_name: file.name, name: file.name.split(".").splice(0, 1).toString(), type: file.type, size: file.size, file: file });
    }
    setImageArray(array);
  };
  const downloadLatex = () => {
    const file = new Blob([`\\begin{document}\n${latexArray.join("\n\n")}\n\\end{document}`], { type: "text/plain" });
    saveAs(file, `latex-content-${new Date().valueOf()}.tex`);
  };

  const downloadDocx = () => {
    const blb = latexArray.createDocx(imageArray);
    blb.then((buffer) => {
      saveAs(buffer, `LaTex-Math-${new Date().valueOf()}.docx`);
    });
  };

  return (
    <Fragment>
      <Header title="Bulk Latex Upload">
        <SmartMindIcon />
      </Header>
      <Grid2 container spacing={2} my={2}>
        <Grid2 size={6} py={2} textAlign={"center"} sx={{ backgroundColor: "#ffe", borderRadius: 2, p: 2 }}>
          <Button component="label" size="small" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
            Upload Latex
            <VisuallyHiddenInput type="file" onChange={(e) => handleLatexFileChange(e.target.files[0])} />
          </Button>
        </Grid2>
        <Grid2 size={6} py={2} textAlign={"center"} sx={{ backgroundColor: "#ffe", borderRadius: 2, p: 2 }}>
          <Button component="label" size="small" color="error" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
            Upload Graphics
            <VisuallyHiddenInput accept="image/*" multiple type="file" onChange={(e) => handleImagesChange(e.target.files)} />
          </Button>
        </Grid2>

        {latexArray?.map((x, k, arr) => {
          return (
            <Fragment key={k}>
              <Grid2 size={{ xs: 12, md: 6 }} sx={{ backgroundColor: "#fff", borderRadius: 2, p: 2 }}>
                <TextField
                  multiline
                  fullWidth
                  maxRows={10}
                  value={x}
                  onChange={(e) => {
                    const content = [...latexArray];
                    content[k] = e.target.value;
                    setLatexArray(content?.filter((f) => f?.trim()?.length > 0));
                  }}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 6 }} sx={{ backgroundColor: "#fff", borderRadius: 2, p: 2, display: "flex", alignItems: "center" }}>
                <div dangerouslySetInnerHTML={{ __html: x?.latex2Html(imageArray ?? []) }}></div>
              </Grid2>
            </Fragment>
          );
        })}

        <Grid2 size={12} textAlign={"center"} sx={{ backgroundColor: "#ffe", borderRadius: 2, p: 2 }}>
          <ButtonGroup variant="contained">
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => {
                downloadLatex();
              }}
              endIcon={<Download />}
            >
              Download Latex
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                downloadDocx();
              }}
              startIcon={<Download />}
            >
              Download Docx
            </Button>
          </ButtonGroup>
        </Grid2>
      </Grid2>
    </Fragment>
  );
}
