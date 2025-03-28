import MuiTableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
const SmartTableRow = styled(MuiTableRow)(({ theme }) => ({
  "& td:first-of-type, & th:first-of-type": { borderTopLeftRadius: 1 * theme.shape.borderRadius, borderBottomLeftRadius: 1 * theme.shape.borderRadius },
  "& td:last-of-type, & th:last-of-type": { borderTopRightRadius: 1 * theme.shape.borderRadius, borderBottomRightRadius: 1 * theme.shape.borderRadius },
  "& td, & th": { padding: theme.spacing(1), border: 0 },
  "&:nth-of-type(even)": { backgroundColor: theme.palette.smartminds.main },
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.smartminds.light },
}));
export default SmartTableRow;
