




import {
  Paper,
  Typography,
} from "@mui/material";

interface Props {
  file: File | null;
  analysisTime: string;
}

export default function SelectedFileCard({
  file,
  analysisTime,
}: Props) {

  if (!file) return null;

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
        📄 Selected File
      </Typography>

      <Typography sx={{ mb: 1 }}>
        <strong>Name:</strong> {file.name}
      </Typography>

      <Typography sx={{ mb: 1 }}>
        <strong>Size:</strong>{" "}
        {(file.size / 1024 / 1024).toFixed(2)} MB
      </Typography>

      <Typography sx={{ mb: 1 }}>
        <strong>Type:</strong>{" "}
        {file.type || "Unknown"}
      </Typography>

      <Typography>
        <strong>Analysis Time:</strong>{" "}
        {analysisTime || "--"}
      </Typography>
    </Paper>
  );
}