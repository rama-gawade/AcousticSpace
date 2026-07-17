



import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
  Divider,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SecurityIcon from "@mui/icons-material/Security";

interface Props {
  prediction: string;
  confidence: number;
  risk: string;
  recommendation: string;
  downloadReport: () => void;
}

export default function PredictionCard({
  prediction,
  confidence,
  risk,
  recommendation,
  downloadReport,
}: Props) {

  if (!prediction) return null;

  const isReal =
    prediction.toLowerCase() === "real";

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
        🤖 AI Analysis Result
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Chip
          icon={
            isReal ? (
              <CheckCircleIcon />
            ) : (
              <WarningAmberIcon />
            )
          }
          label={
            isReal
              ? "REAL AUDIO"
              : "SPOOF AUDIO"
          }
          color={
            isReal
              ? "success"
              : "error"
          }
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            px: 2,
            py: 3,
          }}
        />
      </Box>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
        }}
      >
        Confidence
      </Typography>

      <LinearProgress
        variant="determinate"
        value={confidence}
        color={
          isReal
            ? "success"
            : "error"
        }
        sx={{
          height: 12,
          borderRadius: 5,
          mt: 1,
          mb: 1,
        }}
      />

      <Typography
        align="right"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        {confidence}%
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        <SecurityIcon
          fontSize="small"
          sx={{ mr: 1 }}
        />
        Risk Level
      </Typography>

      <Chip
        label={risk}
        color={
          risk.toLowerCase() === "low"
            ? "success"
            : risk.toLowerCase() === "medium"
            ? "warning"
            : "error"
        }
      />

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Recommendation
      </Typography>

      <Typography
        color="text.secondary"
      >
        {recommendation}
      </Typography>

      <Box
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={downloadReport}
        >
          Download Report
        </Button>
      </Box>
    </Paper>
  );
}