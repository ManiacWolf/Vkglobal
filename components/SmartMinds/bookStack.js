import { Stack } from "@mui/material";

export default function BookStack(props) {
  return (
    <Stack
      direction="column"
      sx={[
        {
          position: "relative",
          zIndex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        (theme) => ({
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            borderRadius: 1,
            zIndex: -1,
            inset: "20% 0",
            backgroundColor: props?.stackColor ?? theme.palette.primary.main,
          },
        }),
      ]}
    >
      {props?.children}
    </Stack>
  );
}
