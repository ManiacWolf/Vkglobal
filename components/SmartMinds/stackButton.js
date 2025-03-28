import { Box } from "@mui/material";

export default function StackButton(props) {
  return (
    <Box
      onClick={props?.onClick}
      sx={{
        display: "inline-flex",
        border: `1px solid ${props?.color ?? "transparent"}`,
        backgroundColor: props?.color ?? "background.paper",
        borderRadius: 1,
        cursor: "pointer",
        alignItems: "stretch",
        textTransform: "uppercase",
        transition: "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "&:hover": {
          boxShadow: "var(--isq-shadows-4)",
        },
      }}
    >
      {props?.startIcon && (
        <Box display={"inline-flex"} alignItems={"center"} sx={{ backgroundColor: "background.paper", borderTopLeftRadius: 6, borderBottomLeftRadius: 6, paddingX: 0.5 }}>
          {props?.startIcon}
        </Box>
      )}
      <Box sx={{ minWidth: 40, paddingY: 1, paddingX: 2, borderRadius: 1, fontWeight: 500 }} display={"inline-flex"} alignItems={"center"}>
        {props?.children}
      </Box>
      {props?.endIcon && (
        <Box display={"inline-flex"} alignItems={"center"} sx={{ backgroundColor: "background.paper", borderTopRightRadius: 6, borderBottomRightRadius: 6, paddingX: 0.5 }}>
          {props?.endIcon}
        </Box>
      )}
    </Box>
  );
}
