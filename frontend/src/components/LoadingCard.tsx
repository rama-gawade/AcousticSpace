


import {
  Paper,
  Typography,
  CircularProgress,
  LinearProgress,
  Box,
} from "@mui/material";

interface Props {
  loading: boolean;
  loadingStep: string;
  isUploading: boolean;
  uploadProgress: number;
}

export default function LoadingCard({
  loading,
  loadingStep,
  isUploading,
  uploadProgress,
}: Props) {

  if (!loading && !isUploading) return null;

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 4,
      }}
    >
      {loading && (
        <>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <CircularProgress
              size={70}
            />

            <Typography
              variant="h5"
              sx={{
                mt: 3,
                fontWeight: "bold",
              }}
            >
              🤖 AI Analysis in Progress
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              {loadingStep}
            </Typography>
          </Box>
        </>
      )}

      {isUploading && (
        <Box
          sx={{
            mt: loading ? 5 : 0,
          }}
        >
          <Typography
            align="center"
            sx={{
              mb: 2,
            }}
          >
            Uploading Audio...
          </Typography>

          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              height: 10,
              borderRadius: 5,
            }}
          />

          <Typography
            align="center"
            sx={{
              mt: 2,
              fontWeight: "bold",
            }}
          >
            {uploadProgress}%
          </Typography>
        </Box>
      )}
    </Paper>
  );
}