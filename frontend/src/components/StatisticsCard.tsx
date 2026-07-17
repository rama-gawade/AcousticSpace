




import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import TimerIcon from "@mui/icons-material/Timer";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SpeedIcon from "@mui/icons-material/Speed";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import InsightsIcon from "@mui/icons-material/Insights";

interface Props {
  duration: string;
  sampleRate: string;
  rmsEnergy: string;
  zeroCrossingRate: string;
  spectralCentroid: string;
  spectralBandwidth: string;
}

export default function StatisticsCard({
  duration,
  sampleRate,
  rmsEnergy,
  zeroCrossingRate,
  spectralCentroid,
  spectralBandwidth,
}: Props) {

  const stats = [
    {
      title: "Duration",
      value: `${duration} sec`,
      icon: <TimerIcon color="primary" />,
    },
    {
      title: "Sample Rate",
      value: `${sampleRate} Hz`,
      icon: <GraphicEqIcon color="success" />,
    },
    {
      title: "RMS Energy",
      value: rmsEnergy,
      icon: <EqualizerIcon color="warning" />,
    },
    {
      title: "Zero Crossing",
      value: zeroCrossingRate,
      icon: <SpeedIcon color="secondary" />,
    },
    {
      title: "Spectral Centroid",
      value: `${spectralCentroid} Hz`,
      icon: <MultilineChartIcon color="info" />,
    },
    {
      title: "Bandwidth",
      value: `${spectralBandwidth} Hz`,
      icon: <InsightsIcon color="error" />,
    },
  ];

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        📊 Audio Statistics
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 2,
        }}
      >
        {stats.map((stat) => (
          <Paper
            key={stat.title}
            elevation={2}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              transition: ".3s",

              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            {stat.icon}

            <Typography
              sx={{
                mt: 1,
                color: "text.secondary",
              }}
            >
              {stat.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mt: 1,
                fontWeight: "bold",
              }}
            >
              {stat.value || "--"}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
}