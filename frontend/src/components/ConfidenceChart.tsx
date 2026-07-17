



import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
  Paper,
  Typography,
} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartItem {
  id: number;
  filename: string;
  confidence: number;
}

interface Props {
  data: ChartItem[];
}

export default function ConfidenceChart({ data }: Props) {

  const chartData = {
    labels: data.map((item) => item.id),

    datasets: [
      {
        label: "Confidence (%)",
        data: data.map((item) => item.confidence),
        borderColor: "#1976d2",
        backgroundColor: "rgba(25,118,210,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        📈 Confidence Trend
      </Typography>

      <Line
        data={chartData}
        options={options}
      />
    </Paper>
  );
}