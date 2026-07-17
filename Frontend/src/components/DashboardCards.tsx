


import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

interface Props {
  total: number;
  real: number;
  spoof: number;
  averageConfidence: number;
}

export default function DashboardCards({
  total,
  real,
  spoof,
  averageConfidence,
}: Props) {
  const cards = [
    {
      title: "Total Analyses",
      value: total,
      color: "#1976d2",
      emoji: "📊",
    },
    {
      title: "Real Audio",
      value: real,
      color: "#2e7d32",
      emoji: "✅",
    },
    {
      title: "Spoof Audio",
      value: spoof,
      color: "#d32f2f",
      emoji: "⚠️",
    },
    {
      title: "Avg Confidence",
      value: `${averageConfidence}%`,
      color: "#ed6c02",
      emoji: "🎯",
    },
  ];

  return (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    {cards.map((card) => (
      <Grid
        key={card.title}
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h3">
            {card.emoji}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 1,
              color: card.color,
              fontWeight: "bold",
            }}
          >
            {card.title}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              mt: 2,
              fontWeight: "bold",
            }}
          >
            {card.value}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);
}
