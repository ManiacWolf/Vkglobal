import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GET_BOOKS_API, GET_CHAPTERS_API, GET_CHAPTER_CATEGORIES, GET_EXTERNAL, GET_PAPER, GET_PAPERS, GET_QUETIONS, POST_PAPER, SELF_LOGIN_API } from "@/helpers/constants";
import { v4 as uuid } from "uuid";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  IconButton,
  ListSubheader,
  Alert,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Header from "@/components/Header";
import "@/helpers/arrays";
import "@/helpers/numbers";
import "@/helpers/date";
import "@/helpers/latex/latex2Html";
import "@/helpers/roman";
import { getUserServerSideProps as getServerSideProps, LogoutButton } from "@/helpers/serverProps";
import { Article, ChevronRight, Close, CloseSharp, DynamicFeed, FeedbackOutlined, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Layers, ListAltSharp, PlayLesson, PlusOne, Print, QuestionAnswerOutlined, TipsAndUpdates, Title } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { BookStack, SmartButton, SmartButton2, SmartCard, SmartCardActionArea, SmartCardContent, SmartTableRow, StackButton } from "@/components/SmartMinds";
import Image from "next/image";
const PreviewDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function Dashboard(props) {
  const { cookies } = props;
  const contentRef = useRef(null);
  const printPaper = useReactToPrint({
    documentTitle: `Question Paper`,
    contentRef: contentRef,
    pageStyle: `@page{size:A4 portrait;margin:0}@media print{body{-webkit-print-color-adjust:exact;}.questions{break-inside:avoid}}`,
  });
  const [headers, setHeaders] = useState({ Authorization: `Bearer ${cookies?.token}` });
  const [user, setUser] = useState();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState();
  const [books, setBooks] = useState();
  const [chapter, setChapters] = useState();
  const [categories, setCategories] = useState();
  const [papers, setPapers] = useState();
  const [openPreview, setOpenPreview] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let serial = 0;

  useEffect(() => {
    setLoading(true);
    const getBooks = async () => {
      await axios
        .get(SELF_LOGIN_API, { headers: headers })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log({ user: error.response.data });
        });
      await axios
        .get(GET_BOOKS_API, { headers: headers })
        .then((response) => {
          const data = response.data;
          const obj = data.map((m) => {
            return { book_id: m.book_id, book_name: m.book_name, grade_id: m.grade_id, grade_name: m.grade.grade_name, subject_id: m.subject_id, subject_name: m.subject.subject_name, color_code: m.color_code, cover_source: m.cover_source };
          });

          setBooks(obj);
          setChapters();
          setCategories();
          setIndex(0);
          setLoading(false);
        })
        .catch((error) => {
          console.log({ book: error.response.data });
          setLoading(false);
        });
    };
    getBooks();
  }, [headers]);

  const getChapters = async () => {
    setLoading(true);
    await axios
      .get(`${GET_CHAPTERS_API}/${selected.book_id}`, { headers: headers })
      .then((response) => {
        const data = response.data;
        setChapters(data);
        setCategories();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };
  const toggleChapter = (value) => () => {
    const checked = [...new Set(selected?.chapters ?? [])];
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelected({ ...selected, chapters: [...new Set(newChecked)] });
  };
  const getCategories = async () => {
    setLoading(true);
    await axios
      .post(GET_CHAPTER_CATEGORIES, { guids: selected?.chapters ?? [] }, { headers: headers })
      .then((response) => {
        const data = response.data;
        setCategories(data);
        setSelected({
          ...selected,
          paper: null,
          categories: data.map((m) => {
            return { ...m, value: null };
          }),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };
  const showPreview = async () => {
    setLoading(true);
    const body = selected?.categories
      ?.filter((f) => f.value)
      .map((m) => {
        return {
          category_id: m.category_id,
          count: m.value,
          chapter_ids: selected?.chapters,
        };
      });
    await axios
      .post(GET_QUETIONS, body, { headers: headers })
      .then((response) => {
        const data = response.data;
        serial = 0;
        setSelected({ ...selected, questions: data, paper: { hours: selected.paper?.hours, minutes: selected.paper?.minutes, print_school_name: true, allow_save: true } });
        setOpenPreview(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };
  const getExternal = async (type) => {
    setLoading(true);
    await axios
      .get(`${GET_EXTERNAL}/${type}/${selected.book_id}`, { headers: headers })
      .then((response) => {
        const data = response.data;
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };
  const getPapers = async () => {
    setLoading(true);
    await axios
      .get(GET_PAPERS, { headers: headers })
      .then((response) => {
        const data = response.data;
        setPapers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };
  const savePaper = async () => {
    if (selected?.paper?.allow_save) {
      selected.paper.allow_save = false;
      setLoading(true);
      const paper_id = uuid();
      const paper = {
        paper_id: paper_id,
        user_id: uuid(),
        created_on: "2025-01-01",
        hours: selected?.paper?.hours,
        minutes: selected?.paper?.minutes,
        print_school_name: selected?.paper?.print_school_name || true,
        questions: selected.questions
          .map((m) => {
            return m.questions.map((q) => {
              return { paper_id: paper_id, question_id: q.question_id };
            });
          })
          .flat(Infinity),
      };
      await axios
        .post(POST_PAPER, paper, { headers: headers })
        .then((response) => {
          setLoading(false);
          printPaper();
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoading(false);
        });
    } else {
      printPaper();
    }
  };
  const getPaper = async (paper_id) => {
    setLoading(true);
    await axios.get(`${GET_PAPER}/${paper_id}`, { headers: headers }).then((response) => {
      const data = response.data;
      const _paper = { ...data, questions: null };
      const _questions = [...data.questions];
      setSelected({ ...selected, paper: _paper, questions: _questions });
      setOpenPreview(true);
      setLoading(false);
    });
  };
  return (
    <>
      <Header title={"Dashboard | Smart Minds"} description={`A web app to generate question papers for the students of Smart Minds Mathematics.`} />

      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Alert icon={false} severity="success" slotProps={{ message: { sx: { width: "100% !important" } } }}>
          <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: { xs: "start", sm: "space-between" }, alignItems: "center", width: "100%" }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction={{ xs: "column", sm: "row" }} sx={{ color: "text.primary" }}>
              <Box>
                <Typography variant="body1" component={Box} fontWeight={"600"}>
                  {user?.name ?? ""}
                </Typography>
                <Typography variant="body2" component={Box} fontWeight={300}>
                  {user?.teacher?.designation ?? ""}, {user?.teacher?.subject ?? ""}
                </Typography>
              </Box>
              <Divider sx={{ display: { xs: "none", sm: "flex" } }} orientation="vertical" variant="middle" flexItem />
              <Divider sx={{ display: { xs: "flex", sm: "none" } }} flexItem />
              <Box>
                <Typography variant="body1" component={Box} fontWeight={"600"}>
                  {user?.teacher?.school_name ?? ""}
                </Typography>
                <Typography variant="body2" component={Box} fontWeight={300}>
                  {`${user?.teacher?.school_address ?? ""}, ${user?.teacher?.school_city ?? ""}, ${user?.teacher?.school_state ?? ""}`}
                  {user?.teacher?.postal_code && ` - ${user?.teacher?.postal_code ?? ""}`}
                </Typography>
              </Box>
              <Divider sx={{ display: { xs: "flex", sm: "none" } }} flexItem />
            </Stack>

            <LogoutButton />
          </Stack>
        </Alert>
      </Container>

      <Container maxWidth="xl">
        <Container disableGutters maxWidth="xl" sx={[{ borderRadius: 2, background: "rgb(229, 249, 249)", background: "linear-gradient(45deg, rgba(229, 249, 249, .5) 0%, rgba(246, 254, 246, .5) 100%)" }]}>
          <Container maxWidth="xl" sx={{ padding: { xs: 1, md: 2 } }}>
            <Grid2 container={true} spacing={{ xs: 2, md: 3, lg: 4 }}>
              {index > 0 && (
                <Grid2 size={{ xs: 12, md: 3 }} display={"flex"} flexDirection={"column"} gap={2} alignItems={"center"}>
                  <Grid2 size={{ xs: 12, md: 10, lg: 9, xl: 8 }} mx={"auto"} mt={1}>
                    <BookStack stackColor={books?.filter((f) => f.book_id == selected?.book_id)[0]?.color_code}>
                      <Image src={`${process.env.CDN_SERVER}/${books?.filter((f) => f.book_id == selected?.book_id)[0]?.cover_source}`} width={155} height={155} quality={100} alt="Smart minds mathematics class IX" />
                    </BookStack>
                  </Grid2>
                  <Box>
                    <Box sx={{ width: { xs: 85, md: 100, xl: 125 }, height: { xs: 0.143356164383562 * 85, md: 0.143356164383562 * 100, xl: 0.143356164383562 * 125 }, position: "relative" }}>
                      <Image src={"/smart-minds.svg"} fill={true} quality={100} alt="VK Global Publications Limited" />
                    </Box>
                    <Typography gutterBottom variant="h5" fontWeight={500} component="div">
                      {books?.filter((f) => f.book_id == selected?.book_id)[0]?.subject_name}
                    </Typography>
                  </Box>
                  <StackButton
                    onClick={() => {
                      if (index < 5) {
                        setIndex(index - 1);
                      } else {
                        setIndex(1);
                      }
                    }}
                    color={books?.filter((f) => f.book_id == selected?.book_id)[0]?.color_code}
                    startIcon={<KeyboardDoubleArrowLeft fontSize="medium" />}
                  >
                    {books?.filter((f) => f.book_id == selected?.book_id)[0]?.grade_name}
                  </StackButton>
                </Grid2>
              )}

              <Grid2 size={{ xs: 12, md: index > 0 ? 7 : 12, lg: index > 0 ? 7.5 : 12, xl: index > 0 ? 8.5 : 12 }} container={true} alignItems={"center"}>
                {index == 0 && (
                  <Grid2 container={true} spacing={6} size={12}>
                    {books?.map((book, i) => {
                      return (
                        <Grid2 key={i} size={{ xs: 6, md: 3 }} display={"flex"} flexDirection={"column"} gap={2} alignItems={"center"}>
                          <Grid2 size={{ xs: 12, md: 10, lg: 9, xl: 8 }} mx={"auto"} mt={1}>
                            <BookStack stackColor={book.color_code}>
                              <Image src={`${process.env.CDN_SERVER}/${book.cover_source}`} width={155} height={155} quality={100} alt="Smart minds mathematics class IX" />
                            </BookStack>
                          </Grid2>
                          <Box>
                            <Box sx={{ width: { xs: 85, md: 100, xl: 125 }, height: { xs: 0.143356164383562 * 85, md: 0.143356164383562 * 100, xl: 0.143356164383562 * 125 }, position: "relative" }}>
                              <Image src={"/smart-minds.svg"} fill={true} quality={100} alt="VK Global Publications Limited" />
                            </Box>
                            <Typography gutterBottom variant="h5" fontWeight={500} component="div">
                              {book.subject_name}
                            </Typography>
                          </Box>
                          <StackButton
                            onClick={() => {
                              setSelected({ book_id: book.book_id });
                              setIndex(1);
                            }}
                            color={book.color_code}
                            endIcon={<ChevronRight fontSize="medium" />}
                          >
                            {book.grade_name}
                          </StackButton>
                        </Grid2>
                      );
                    })}
                    <Box sx={{ width: { xs: 220, sm: 250, md: 275, xl: 300 }, mx: "auto", my: 3 }}>
                      <SmartButton fullWidth startIcon={<FeedbackOutlined />}>
                        Feedback/Questions
                      </SmartButton>
                    </Box>
                  </Grid2>
                )}
                {index == 1 && (
                  <Grid2 container={true} spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }} display={"flex"}>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                      <SmartCard>
                        <SmartCardActionArea
                          onClick={() => {
                            getExternal("dlr");
                            setIndex(6);
                          }}
                        >
                          <SmartCardContent>
                            <QuestionAnswerOutlined sx={{ fontSize: 36 }} color="primary" />
                            <Typography variant="h3" fontWeight={300}>
                              Solution Booklet
                            </Typography>
                          </SmartCardContent>
                        </SmartCardActionArea>
                      </SmartCard>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                      <SmartCard>
                        <SmartCardActionArea
                          onClick={() => {
                            getExternal("cbse-update");
                            setIndex(9);
                          }}
                        >
                          <SmartCardContent>
                            <DynamicFeed sx={{ fontSize: 36 }} color="primary" />
                            <Typography variant="h3" fontWeight={300}>
                              CBSE Updates
                            </Typography>
                          </SmartCardContent>
                        </SmartCardActionArea>
                      </SmartCard>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                      <SmartCard>
                        <SmartCardActionArea
                          onClick={() => {
                            getExternal("avlr");
                            setIndex(7);
                          }}
                        >
                          <SmartCardContent>
                            <QuestionAnswerOutlined sx={{ fontSize: 36 }} color="primary" />
                            <Typography variant="h3" fontWeight={300}>
                              AVLRs
                            </Typography>
                          </SmartCardContent>
                        </SmartCardActionArea>
                      </SmartCard>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                      <SmartCard>
                        <SmartCardActionArea
                          onClick={() => {
                            setIndex(2);
                          }}
                        >
                          <SmartCardContent>
                            <Article sx={{ fontSize: 36 }} color="primary" />
                            <Typography variant="h3" fontWeight={300}>
                              Paper Generator
                            </Typography>
                          </SmartCardContent>
                        </SmartCardActionArea>
                      </SmartCard>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                      <SmartCard>
                        <SmartCardActionArea
                          onClick={() => {
                            getExternal("lesson-plan");
                            setIndex(8);
                          }}
                        >
                          <SmartCardContent>
                            <PlayLesson sx={{ fontSize: 36 }} color="primary" />
                            <Typography variant="h3" fontWeight={300}>
                              Lesson Plan
                            </Typography>
                          </SmartCardContent>
                        </SmartCardActionArea>
                      </SmartCard>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                      <SmartCard>
                        <SmartCardActionArea
                          onClick={() => {
                            getExternal("project-plan");
                            setIndex(10);
                          }}
                        >
                          <SmartCardContent>
                            <TipsAndUpdates sx={{ fontSize: 36 }} color="primary" />
                            <Typography variant="h3" fontWeight={300}>
                              Project Ideas
                            </Typography>
                          </SmartCardContent>
                        </SmartCardActionArea>
                      </SmartCard>
                    </Grid2>
                  </Grid2>
                )}
                {index == 2 && (
                  <Grid2 container={true} spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }} width={"100%"}>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                      <SmartCard>
                        <SmartCardActionArea
                          onClick={() => {
                            getChapters();
                            setIndex(3);
                          }}
                        >
                          <SmartCardContent>
                            <PlusOne sx={{ fontSize: 36 }} color="primary" />
                            <Typography variant="h3" fontWeight={300}>
                              Create a paper
                            </Typography>
                          </SmartCardContent>
                        </SmartCardActionArea>
                      </SmartCard>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 4 }}>
                      <SmartCard>
                        <SmartCardActionArea
                          onClick={() => {
                            getPapers();
                            setIndex(5);
                          }}
                        >
                          <SmartCardContent>
                            <KeyboardDoubleArrowLeft sx={{ fontSize: 36 }} color="primary" />
                            <Typography variant="h3" fontWeight={300}>
                              Previous papers
                            </Typography>
                          </SmartCardContent>
                        </SmartCardActionArea>
                      </SmartCard>
                    </Grid2>
                  </Grid2>
                )}
                {index == 3 && (
                  <Grid2 container={true} spacing={2} size={12}>
                    {chapter?.chapters?.map((k, i, arr) => {
                      return (
                        <Grid2 key={i} size={{ xs: 12, md: 6 }}>
                          <SmartButton2 fullWidth className={(selected?.chapters ?? []).includes(k.chapter_id) ? "active" : ""} onClick={toggleChapter(k.chapter_id)}>
                            <Typography variant="h5" fontWeight={500}>
                              {k.chapter_name}
                            </Typography>
                          </SmartButton2>
                        </Grid2>
                      );
                    })}
                    <Grid2 size={12}>
                      <Divider />
                      <Box sx={{ width: { xs: 220, sm: 250, md: 275, xl: 300 }, mx: "auto", my: 3 }}>
                        <SmartButton
                          fullWidth
                          size="large"
                          endIcon={<KeyboardDoubleArrowRight />}
                          disabled={(selected?.chapters ?? []).length == 0}
                          onClick={() => {
                            getCategories();
                            setIndex(4);
                          }}
                        >
                          Proceed
                        </SmartButton>
                      </Box>
                    </Grid2>
                  </Grid2>
                )}

                {index == 4 && (
                  <>
                    <Box sx={{ width: "100%", overflowX: "auto" }}>
                      <Table sx={{ borderCollapse: "separate", borderSpacing: 6 }}>
                        <TableHead>
                          <SmartTableRow sx={{ "& th": { backgroundColor: "smartminds.dark" } }}>
                            <TableCell>
                              <Typography variant="h6">Question Type</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6" textAlign={"center"}>
                                Mark(s)/que.
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6" textAlign={"center"}>
                                No. of que.
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6" textAlign={"right"}>
                                Mark(s)
                              </Typography>
                            </TableCell>
                          </SmartTableRow>
                        </TableHead>
                        <TableBody>
                          {selected?.categories?.map((k, i, arr) => {
                            return (
                              <SmartTableRow key={i}>
                                <TableCell>
                                  <Typography variant="normal" fontWeight={500}>
                                    {k.category_name}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="normal" textAlign={"center"} fontWeight={500}>
                                    {`${k.marks} ${k.marks > 1 ? "Marks" : "Mark"} each`}
                                  </Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <TextField
                                    id={`qn${k.category_id}`}
                                    inputMode="text"
                                    value={k.value ?? ""}
                                    slotProps={{ htmlInput: { max: 25, min: 0, maxLength: 2, style: { fontSize: "1.1rem", fontWeight: 600, width: 55, backgroundColor: "smartminds.main", padding: 8, color: "text.secondary" } } }}
                                    onChange={(e) => {
                                      const cats = [...selected.categories];
                                      const val = parseInt(e.target.value.replace(/[^0-9]/, "")) || null;
                                      cats[i].value = val;
                                      setSelected({ ...selected, categories: cats });
                                    }}
                                    name={`qn${k.category_id}`}
                                    variant="outlined"
                                    color="success"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Typography variant="normal" textAlign={"right"} fontWeight={500} color={k.value * k.marks > 0 ? "success" : ""}>{`${k.value * k.marks} ${k.value * k.marks > 1 ? "Marks" : "Mark"}`}</Typography>
                                </TableCell>
                              </SmartTableRow>
                            );
                          })}
                        </TableBody>
                        <TableFooter>
                          <SmartTableRow sx={{ "& td": { backgroundColor: "smartminds.dark" } }}>
                            <TableCell colSpan={2}>
                              <Typography variant="h5" textAlign={"right"}>
                                Total
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="h5" textAlign={"center"}>
                                {selected?.categories?.map((m) => m.value).reduce((p, a) => p + a, 0)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h5" textAlign={"right"}>
                                {`${selected?.categories?.map((m) => m.value * m.marks).reduce((p, a) => p + a, 0)} ${selected?.categories?.map((m) => m.value * m.marks).reduce((p, a) => p + a, 0) > 1 ? "Marks" : "Mark"}`}
                              </Typography>
                            </TableCell>
                          </SmartTableRow>
                          <SmartTableRow sx={{ "& td": { backgroundColor: "smartminds.dark" } }}>
                            <TableCell>
                              <Typography variant="h5" textAlign={"right"}>
                                Duration
                              </Typography>
                            </TableCell>

                            <TableCell sx={{ textAlign: "center" }}>
                              <TextField
                                inputMode="text"
                                placeholder="Hours"
                                value={selected?.paper?.hours}
                                slotProps={{ htmlInput: { max: 5, min: 0, maxLength: 1, style: { fontSize: "1.1rem", fontWeight: 600, width: 55, backgroundColor: "smartminds.main", padding: 8, color: "text.secondary" } } }}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/, "")) || "";
                                  setSelected({ ...selected, paper: { ...selected?.paper, hours: val } });
                                }}
                                variant="outlined"
                                color="success"
                              />
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <TextField
                                inputMode="text"
                                placeholder="Minutes"
                                value={selected?.paper?.minutes}
                                slotProps={{ htmlInput: { max: 59, min: 1, maxLength: 2, pattern: "[0-9]", style: { fontSize: "1.1rem", fontWeight: 600, width: 75, backgroundColor: "smartminds.main", padding: 8, color: "text.secondary" } } }}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/, "")) || "";
                                  setSelected({ ...selected, paper: { ...selected?.paper, minutes: val } });
                                }}
                                variant="outlined"
                                color="success"
                              />
                            </TableCell>
                            <TableCell>
                              <SmartButton
                                fullWidth
                                endIcon={<KeyboardDoubleArrowRight />}
                                disabled={selected?.categories?.map((m) => m.value).reduce((p, a) => p + a, 0) > 0 && (selected?.paper?.hours > 0 || selected.paper?.minutes > 0) ? false : true}
                                onClick={() => {
                                  showPreview();
                                }}
                              >
                                Generate Paper
                              </SmartButton>
                            </TableCell>
                          </SmartTableRow>
                        </TableFooter>
                      </Table>
                    </Box>
                  </>
                )}
                {index == 5 && (
                  <Grid2 container={true} spacing={2} size={12}>
                    {papers?.map((k, i, arr) => {
                      return (
                        <Grid2 key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                          <SmartButton2
                            fullWidth
                            onClick={() => {
                              getPaper(k.paper_id);
                            }}
                          >
                            <Box width={"100%"}>
                              <Stack direction={"row"} alignItems={"center"} width={"100%"} justifyContent={"space-between"}>
                                <Typography variant="h5" fontWeight={700}>
                                  {`Paper: ${i + 1}`}
                                </Typography>
                                <Typography variant="h5" fontWeight={700}>
                                  {`${k.question_marks > 1 ? `${k.question_marks} marks` : `${k.question_marks} mark`}`}
                                </Typography>
                              </Stack>
                              <Typography variant="h5" fontWeight={300}>
                                {`(${new Date(k.created_on).format()})`}
                              </Typography>
                            </Box>
                          </SmartButton2>
                        </Grid2>
                      );
                    })}
                  </Grid2>
                )}
                {index == 6 && (
                  <>
                    <Box sx={{ width: "100%", bgcolor: "#fff", borderRadius: 1 }}>
                      <List>
                        <ListItem divider>
                          <ListItemIcon>
                            <ListAltSharp />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              <Typography variant="h5" component={"span"} fontWeight={500}>
                                Digital learning resources (DLRs)
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListSubheader>
                          <ListItem>
                            <ListItemIcon>
                              <QuestionAnswerOutlined />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography fontSize={"body1"} fontWeight={600}>
                                  DLR No.
                                </Typography>
                              }
                              secondary={
                                <Typography fontSize={"body1"} fontWeight={300}>
                                  Digital learning resource number
                                </Typography>
                              }
                            />
                          </ListItem>
                        </ListSubheader>

                        <ListItem disableGutters disablePadding>
                          <List sx={{ width: "100%", maxHeight: { xs: "auto", md: "calc(100vh - 370px)" }, overflowY: "auto", marginLeft: 4 }}>
                            {categories?.map((k, i, arr) => {
                              return (
                                <ListItem
                                  secondaryAction={
                                    <IconButton aria-label="comment">
                                      <ChevronRight />
                                    </IconButton>
                                  }
                                  key={i}
                                  divider
                                >
                                  <ListItemButton href={k.url} target="dlr" sx={{ marginRight: 1 }}>
                                    <ListItemIcon>
                                      <Layers />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography fontSize={"body1"} fontWeight={500}>
                                          {k.title}
                                        </Typography>
                                      }
                                    />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </ListItem>
                      </List>
                    </Box>
                  </>
                )}
                {index == 7 && (
                  <>
                    <Box sx={{ width: "100%", bgcolor: "#fff", borderRadius: 1 }}>
                      <List>
                        <ListItem divider>
                          <ListItemIcon>
                            <ListAltSharp />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              <Typography variant="h5" component={"span"} fontWeight={500}>
                                Audio visual learning resources (AVLRs)
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListSubheader>
                          <ListItem>
                            <ListItemIcon>
                              <QuestionAnswerOutlined />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography fontSize={"h6"} fontWeight={700}>
                                  AVLR No.
                                </Typography>
                              }
                              secondary={
                                <Typography fontSize={"body1"} fontWeight={400}>
                                  Audio visual learning resource number
                                </Typography>
                              }
                            />
                          </ListItem>
                        </ListSubheader>

                        <ListItem disableGutters disablePadding>
                          <List sx={{ width: "100%", maxHeight: { xs: "auto", md: "calc(100vh - 370px)" }, overflowY: "auto", marginLeft: 4 }}>
                            {categories?.map((k, i, arr) => {
                              return (
                                <ListItem
                                  secondaryAction={
                                    <IconButton aria-label="comment">
                                      <ChevronRight />
                                    </IconButton>
                                  }
                                  key={i}
                                  divider
                                >
                                  <ListItemButton href={k.url} target="avlr" sx={{ marginRight: 1 }}>
                                    <ListItemIcon>
                                      <Layers />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography fontSize={"body1"} fontWeight={500}>
                                          {k.title}
                                        </Typography>
                                      }
                                    />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </ListItem>
                      </List>
                    </Box>
                  </>
                )}
                {index == 8 && (
                  <>
                    <Box sx={{ width: "100%", bgcolor: "#fff", borderRadius: 1 }}>
                      <List>
                        <ListItem divider>
                          <ListItemIcon>
                            <PlayLesson />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              <Typography variant="h5" component={"span"} fontWeight={500}>
                                Lesson Plan
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListSubheader>
                          <ListItem>
                            <ListItemIcon>
                              <Title />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography fontSize={"body1"} fontWeight={600}>
                                  Title
                                </Typography>
                              }
                            />
                          </ListItem>
                        </ListSubheader>

                        <ListItem disableGutters disablePadding>
                          <List sx={{ width: "100%", maxHeight: { xs: "auto", md: "calc(100vh - 370px)" }, overflowY: "auto", marginLeft: 4 }}>
                            {categories?.orderDescendingBy("display_index")?.map((k, i, arr) => {
                              return (
                                <ListItem
                                  secondaryAction={
                                    <IconButton aria-label="comment">
                                      <ChevronRight />
                                    </IconButton>
                                  }
                                  key={i}
                                  divider
                                >
                                  <ListItemButton href={k.url} target="cbse" sx={{ marginRight: 1 }}>
                                    <ListItemIcon>
                                      <PlayLesson />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography fontSize={"body1"} fontWeight={500} component={"div"}>
                                          {k.title}
                                        </Typography>
                                      }
                                      secondary={
                                        <Typography fontSize={"body2"} component={"div"}>
                                          {k.description}
                                        </Typography>
                                      }
                                    />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </ListItem>
                      </List>
                    </Box>
                  </>
                )}
                {index == 9 && (
                  <>
                    <Box sx={{ width: "100%", bgcolor: "#fff", borderRadius: 1 }}>
                      <List>
                        <ListItem divider>
                          <ListItemIcon>
                            <DynamicFeed />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              <Typography variant="h5" component={"span"} fontWeight={500}>
                                CBSE updates
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListSubheader>
                          <ListItem>
                            <ListItemIcon>
                              <Title />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography fontSize={"body1"} fontWeight={600}>
                                  Title
                                </Typography>
                              }
                            />
                          </ListItem>
                        </ListSubheader>

                        <ListItem disableGutters disablePadding>
                          <List sx={{ width: "100%", maxHeight: { xs: "auto", md: "calc(100vh - 370px)" }, overflowY: "auto", marginLeft: 4 }}>
                            {categories?.orderDescendingBy("display_index")?.map((k, i, arr) => {
                              return (
                                <ListItem
                                  secondaryAction={
                                    <IconButton aria-label="comment">
                                      <ChevronRight />
                                    </IconButton>
                                  }
                                  key={i}
                                  divider
                                >
                                  <ListItemButton href={k.url} target="cbse" sx={{ marginRight: 1 }}>
                                    <ListItemIcon>
                                      <DynamicFeed />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography fontSize={"body1"} fontWeight={500} component={"div"}>
                                          {k.title}
                                        </Typography>
                                      }
                                      secondary={
                                        <Typography fontSize={"body2"} component={"div"}>
                                          {k.description}
                                        </Typography>
                                      }
                                    />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </ListItem>
                      </List>
                    </Box>
                  </>
                )}
                {index == 10 && (
                  <>
                    <Box sx={{ width: "100%", bgcolor: "#fff", borderRadius: 1 }}>
                      <List>
                        <ListItem divider>
                          <ListItemIcon>
                            <TipsAndUpdates />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              <Typography variant="h5" component={"span"} fontWeight={500}>
                                Project Ideas
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListSubheader>
                          <ListItem>
                            <ListItemIcon>
                              <Title />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography fontSize={"body1"} fontWeight={600}>
                                  Title
                                </Typography>
                              }
                            />
                          </ListItem>
                        </ListSubheader>

                        <ListItem disableGutters disablePadding>
                          <List sx={{ width: "100%", maxHeight: { xs: "auto", md: "calc(100vh - 370px)" }, overflowY: "auto", marginLeft: 4 }}>
                            {categories?.orderDescendingBy("display_index")?.map((k, i, arr) => {
                              return (
                                <ListItem
                                  secondaryAction={
                                    <IconButton aria-label="comment">
                                      <ChevronRight />
                                    </IconButton>
                                  }
                                  key={i}
                                  divider
                                >
                                  <ListItemButton href={k.url} target="cbse" sx={{ marginRight: 1 }}>
                                    <ListItemIcon>
                                      <TipsAndUpdates />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography fontSize={"body1"} fontWeight={500} component={"div"}>
                                          {k.title}
                                        </Typography>
                                      }
                                      secondary={
                                        <Typography fontSize={"body2"} component={"div"}>
                                          {k.description}
                                        </Typography>
                                      }
                                    />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </ListItem>
                      </List>
                    </Box>
                  </>
                )}
              </Grid2>
            </Grid2>
          </Container>
        </Container>
      </Container>

      <PreviewDialog
        maxWidth="md"
        onClose={() => {
          setOpenPreview(false);
        }}
        aria-labelledby="pd-title"
        open={openPreview}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="pd-title">
          Question Paper Preview
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenPreview(false);
          }}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <Divider flexItem />
        <DialogContent ref={contentRef}>
          {(selected?.paper?.print_school_name ?? true) && (
            <Grid2 container={true} alignItems="center" flexDirection={"column"}>
              <Typography variant="normal" textAlign={"center"} fontWeight={700}>
                {user?.teacher?.school_name}
              </Typography>
              <Typography variant="body1" textAlign={"center"} fontWeight={400} gutterBottom>
                {`${user?.teacher?.school_address}, ${user?.teacher?.school_city}, ${user?.teacher?.school_state}`}
                {user?.teacher?.postal_code && ` - ${user?.teacher?.postal_code}`}
              </Typography>
            </Grid2>
          )}
          <Grid2 container={true} justifyContent={"space-between"}>
            <Box>
              <Typography variant="body1" component={"span"} fontWeight={500}>
                Subject:&nbsp;
              </Typography>
              <Typography variant="body1" component={"span"} fontWeight={600}>
                {books?.filter((f) => f.book_id == selected?.book_id)[0]?.subject_name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" component={"span"} fontWeight={500}>
                Class:&nbsp;
              </Typography>
              <Typography variant="body1" component={"span"} fontWeight={600}>
                {`${books?.filter((f) => f.book_id == selected?.book_id)[0]?.grade_name?.replace("Class ", "")}`}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" component={"span"} fontWeight={500}>
                Time:&nbsp;
              </Typography>
              <Typography variant="body1" component={"span"} fontWeight={600}>
                {((parseInt(selected?.paper?.hours) || 0) * 60 + (parseInt(selected?.paper?.minutes) || 0)).toHourMinutesLabel()}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 container={true} justifyContent={"end"}>
            <Typography variant="body1" component={"span"} fontWeight={500}>
              Max Mark(s):&nbsp;
            </Typography>
            <Typography variant="body1" component={"span"} fontWeight={600}>
              {`${selected?.questions?.map((m) => m.questions?.length * m.marks).reduce((p, a) => p + a, 0)}`}
            </Typography>
          </Grid2>
          <Divider sx={{ marginY: 1 }} />
          {selected?.questions?.map((el, i) => {
            return (
              <Fragment key={i}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.51, marginTop: 2, mb: 1 }}>
                  <Typography variant="normal" fontWeight={700}>{`${(i + 1).toRomanNumeral()}. `}</Typography>
                  <Typography variant="normal" fontWeight={600}>
                    {el.category_name}
                  </Typography>
                </Box>
                {el.questions?.map((q, k) => {
                  serial++;
                  return (
                    <Box key={k} className="questions" sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", ms: 1, gap: 0.5, marginTop: 0.5, marginBottom: 1, width: "100%" }}>
                      <Typography fontSize="body1" fontWeight={400} component={Box}>
                        <Typography fontSize="body1" fontWeight={600} component={"span"} textAlign={"right"}>{`${serial}. `}</Typography>
                        <span dangerouslySetInnerHTML={{ __html: q.question.latex2Html([]) }}></span>
                      </Typography>
                      <Typography variant="body1" textAlign={"right"} sx={{ width: 115 }} component={Box} fontWeight={600}>
                        {el.marks > 1 ? `${el.marks} marks` : `${el.marks} mark`}
                      </Typography>
                    </Box>
                  );
                })}
              </Fragment>
            );
          })}
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <FormControlLabel control={<Checkbox checked={selected?.paper?.print_school_name ?? true} onChange={(e) => setSelected({ ...selected, paper: { ...selected?.paper, print_school_name: e.target.checked } })} />} label="Print School Name" />
          <Button
            disabled={isLoading}
            onClick={() => {
              savePaper();
            }}
            startIcon={<Print />}
          >
            Print
          </Button>
          <Button
            autoFocus
            onClick={() => {
              setOpenPreview(false);
            }}
            startIcon={<CloseSharp />}
          >
            Close
          </Button>
        </DialogActions>
      </PreviewDialog>
    </>
  );
}
export { getServerSideProps };
