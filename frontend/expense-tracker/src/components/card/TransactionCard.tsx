import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./TransactionCard.scss";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <div className="card-content">
          <div>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              name
            </Typography>
            <Typography component="div"> type</Typography>
          </div>
          <div>
            <Typography sx={{ color: "text.secondary" }}>amount</Typography>
            <Typography variant="body2">payment method</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
