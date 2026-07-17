import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import {
  Paper,
  Typography,
  Stack,
  Button,
  Slider,
  Box,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

interface Props {
  audioUrl: string;
}

export default function AudioWaveform({
  audioUrl,
}: Props) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    if (!audioUrl || !waveformRef.current) return;

    waveSurfer.current?.destroy();

    const ws = WaveSurfer.create({
      container: waveformRef.current,

      url: audioUrl,

      waveColor: "#90caf9",

      progressColor: "#1976d2",

      cursorColor: "#ef5350",

      height: 100,

      barWidth: 3,

      barGap: 2,

      barRadius: 4,

      normalize: true,

      
    });

    waveSurfer.current = ws;

    ws.on("ready", () => {
      setDuration(ws.getDuration());
    });

    ws.on("timeupdate", (time) => {
      setCurrentTime(time);
    });

    ws.on("play", () => {
      setIsPlaying(true);
    });

    ws.on("pause", () => {
      setIsPlaying(false);
    });

    ws.on("finish", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      ws.destroy();
    };
  }, [audioUrl]);

  const playPause = () => {
    waveSurfer.current?.playPause();
  };

  const stop = () => {
    waveSurfer.current?.stop();

    setCurrentTime(0);

    setIsPlaying(false);
  };

  const changeVolume = (
    _: Event,
    value: number | number[]
  ) => {
    const volumeValue = value as number;

    setVolume(volumeValue);

    waveSurfer.current?.setVolume(volumeValue / 100);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);

    const secs = Math.floor(time % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!audioUrl) return null;

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          mb: 3,
        }}
      >
        <GraphicEqIcon color="primary" />

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          Audio Waveform
        </Typography>
      </Box>

      <Box
        ref={waveformRef}
        sx={{
          mb: 3,
        }}
      />

      <Stack
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={
              isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayArrowIcon />
              )
            }
            onClick={playPause}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<StopIcon />}
            onClick={stop}
          >
            Stop
          </Button>
        </Stack>

        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <VolumeUpIcon color="primary" />

        <Slider
          value={volume}
          min={0}
          max={100}
          onChange={changeVolume}
          sx={{
            width: "100%",
          }}
        />
      </Box>
    </Paper>
  );
}