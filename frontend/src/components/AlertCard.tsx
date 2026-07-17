


import {
  Alert,
  AlertTitle,
  Box,
  Fade,
} from "@mui/material";

interface Props {
  message: string;
}

export default function AlertCard({
  message,
}: Props) {

  if (!message) return null;

  const isSuccess =
    message.includes("Successful");

  const isFailed =
    message.includes("Failed");

  return (
    <Fade
      in={Boolean(message)}
      timeout={700}
    >
      <Box sx={{ mt: 4 }}>

        {isSuccess && (
          <Alert
            severity="success"
            sx={{
              borderRadius: 3,
            }}
          >
            <AlertTitle>
              Analysis Completed
            </AlertTitle>

            Your audio has been successfully analyzed.
          </Alert>
        )}

        {isFailed && (
          <Alert
            severity="error"
            sx={{
              borderRadius: 3,
            }}
          >
            <AlertTitle>
              Analysis Failed
            </AlertTitle>

            Please check:

            <ul
              style={{
                marginTop: 8,
                paddingLeft: 20,
              }}
            >
              <li>Backend server is running</li>
              <li>Audio file is valid</li>
              <li>Network connection</li>
              <li>Model is loaded correctly</li>
            </ul>

          </Alert>
        )}

      </Box>
    </Fade>
  );
}