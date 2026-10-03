import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEdit from "@mui/icons-material/ModeEdit";

export default function ActionCell(props: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        height: "100%",
      }}
    >
      <IconButton color="gray" aria-label="add an alarm" onClick={props.onEdit}>
        <ModeEdit sx={{ fontSize: 20 }} />
      </IconButton>

      <IconButton
        color="large"
        aria-label="add an alarm"
        onClick={props.onDelete}
      >
        <DeleteIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </div>
  );
}
