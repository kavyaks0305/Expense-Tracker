import { Button } from "@mui/material";

import "./Button.scss";

function CommonButton(props: any) {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        borderRadius: 10,
        textTransform: "none",
      }}
      {...props}
    />
  );
}

export default CommonButton;
