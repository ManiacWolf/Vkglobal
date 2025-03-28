import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import { SmartMindIcon } from "@/components/SmartIcons";
import { Grid2 } from "@mui/material";
import Books from "./books";
import { Fragment } from "react";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Audio-Visual Learning Resources",
    description: "Our audio-visual learning materials are customized to suit your needs, boosting your productivity and simplifying your study process.",
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Question Paper Generator",
    description: "Discover the effortless and unbeatable question paper generator that creates papers in under a minute.",
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Solution Booklet",
    description: "Integrate our product into your daily routine, as we offer not only top-tier learning content but also solutions to the questions within each chapter.",
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "CBSE Announcements",
    description: "Stay ahead by setting new standards in teaching with regular and timely updates on CBSE announcements and instructions.",
  },
];

export default function Content() {
  return (
    <Box>
      <Books />

      <Box my={2} display={"block"}>
        <Typography variant="display5">C-STEM</Typography>
        <Typography variant="normal" fontWeight={500} color={"error"}>
          (Comprehensive System of Teaching and Educational Materials)
        </Typography>
      </Box>
      <Stack spacing={{ xs: 1, md: 2 }}>
        {items.map((item, index) => (
          <Stack key={index} direction="row" spacing={{ xs: 1 }}>
            {item.icon}
            <Box>
              <Typography gutterBottom variant="normal" component={"h3"} sx={{ fontWeight: "600" }}>
                {item.title}
              </Typography>
              <Typography variant="body2" component={"p"}>
                {item.description}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
