



import {
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  dragActive: boolean;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function UploadCard({
  dragActive,
  handleDrag,
  handleDrop,
  onFileSelect,
}: Props) {
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
        📂 Upload Audio
      </Typography>

      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          p: 5,
          border: "2px dashed",
          borderColor: dragActive
            ? "primary.main"
            : "#bbb",
          borderRadius: 4,
          textAlign: "center",
          bgcolor: dragActive
            ? "#E3F2FD"
            : "#FAFAFA",
          transition: "0.3s",
          cursor: "pointer",

          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: 6,
          },
        }}
      >
        <CloudUploadIcon
          sx={{
            fontSize: 70,
            color: "primary.main",
            mb: 2,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          Drag & Drop Audio Here
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 3,
          }}
        >
          or click below to browse files
        </Typography>

        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Choose Audio File

          <input
            hidden
            type="file"
            accept=".wav,.mp3,.flac,.ogg"
            onChange={onFileSelect}
          />
        </Button>
      </Box>
    </Paper>
  );
}