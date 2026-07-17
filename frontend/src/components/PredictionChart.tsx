


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

import {
  Paper,
  Typography,
} from "@mui/material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  real: number;
  spoof: number;
}

export default function PredictionChart({
  real,
  spoof,
}: Props) {

  const data = {
    labels: ["Real Audio", "Spoof Audio"],

    datasets: [
      {
        data: [real, spoof],

        backgroundColor: [
          "#4CAF50",
          "#F44336",
        ],

        borderColor: [
          "#388E3C",
          "#D32F2F",
        ],

        borderWidth: 2,
      },
    ],
  };

  const options = {

    responsive: true,

    plugins: {

      legend: {
        position: "bottom" as const,
      },

      title: {
        display: false,
      },

    },

  };

  return (

    <Paper
      elevation={6}
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 3,
      }}
    >

      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}
      >
        📊 Prediction Distribution
      </Typography>

      <Pie
        data={data}
        options={options}
      />

    </Paper>

  );
}