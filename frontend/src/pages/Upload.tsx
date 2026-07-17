



import React, { useEffect, useState } from "react";

import api from "../services/api";

// Components
import UploadCard from "../components/UploadCard";
import SelectedFileCard from "../components/SelectedFileCard";
import AudioWaveform from "../components/AudioWaveform";
import StatisticsCard from "../components/StatisticsCard";
import LoadingCard from "../components/LoadingCard";
import AlertCard from "../components/AlertCard";
import PredictionCard from "../components/PredictionCard";
import DashboardCards from "../components/DashboardCards";
import PredictionChart from "../components/PredictionChart";
import ConfidenceChart from "../components/ConfidenceChart";
import HistoryTable from "../components/HistoryTable";

// Material UI
import {
  Box,
  Button,
  Typography,
  Paper,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface HistoryItem {
  id: number;
  filename: string;
  prediction: string;
  confidence: number;
  risk: string;
  created_at: string;
}

interface DashboardData {
  total: number;
  real: number;
  spoof: number;
  average_confidence: number;
}

interface ChartItem {
  id:number;
  filename: string;
  confidence: number;
}

function Upload() {

  // =============================
  // File
  // =============================

  const [file, setFile] = useState<File | null>(null);

  const [audioUrl, setAudioUrl] = useState("");

  // =============================
  // Analysis
  // =============================

  const [prediction, setPrediction] = useState("");

  const [confidence, setConfidence] = useState(0);

  const [recommendation, setRecommendation] = useState("");

  const [risk, setRisk] = useState("");

  const [message, setMessage] = useState("");

  // =============================
  // Audio Statistics
  // =============================

  const [duration, setDuration] = useState("");

  const [sampleRate, setSampleRate] = useState("");

  const [analysisTime, setAnalysisTime] = useState("");

  const [rmsEnergy, setRmsEnergy] = useState("");

  const [zeroCrossingRate, setZeroCrossingRate] = useState("");

  const [spectralCentroid, setSpectralCentroid] = useState("");

  const [spectralBandwidth, setSpectralBandwidth] = useState("");

  // =============================
  // Upload Status
  // =============================

  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingStep, setLoadingStep] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  // =============================
  // Dashboard
  // =============================

  const [dashboard, setDashboard] =
    useState<DashboardData>({
      total: 0,
      real: 0,
      spoof: 0,
      average_confidence: 0,
    });

  // =============================
  // History
  // =============================

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  // =============================
  // Charts
  // =============================

  const [chartData, setChartData] =
    useState<ChartItem[]>([]);

  // =============================
  // Reset Analysis
  // =============================

  const resetAnalysis = () => {

    setPrediction("");

    setConfidence(0);

    setRecommendation("");

    setRisk("");

    setDuration("");

    setSampleRate("");

    setAnalysisTime("");

    setRmsEnergy("");

    setZeroCrossingRate("");

    setSpectralCentroid("");

    setSpectralBandwidth("");

    setMessage("");

  };

  // =============================
  // Dashboard API
  // =============================

  const loadDashboard = async () => {

    try {

      const response = await api.get("/dashboard/");

      setDashboard(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  // =============================
  // History API
  // =============================

  const loadHistory = async () => {

    try {

      const response = await api.get("/history/");

      setHistory(response.data.data);

    } catch (error) {

      console.error(error);

    }

  };

  // =============================
  // Confidence Chart
  // =============================

  const loadChartData = async () => {

    try {

      const response =
        await api.get("/charts/confidence");

      setChartData(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  // =============================
  // Initial Load
  // =============================

  useEffect(() => {

    loadDashboard();

    loadHistory();

    loadChartData();

  }, []);

    // =============================
  // Upload Audio
  // =============================

  const uploadAudio = async () => {

    if (!file) {

      setMessage("Please choose an audio file.");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      setLoadingStep("Uploading Audio...");

      setIsUploading(true);

      setUploadProgress(0);

      const response = await api.post(
        "/upload/",
        formData,
        {
          onUploadProgress: (progressEvent) => {

            if (progressEvent.total) {

              const percent = Math.round(
                (progressEvent.loaded * 100) /
                  progressEvent.total
              );

              setUploadProgress(percent);

            }

          },
        }
      );

      // =============================
      // AI Result
      // =============================

      setPrediction(response.data.prediction);

      setConfidence(response.data.confidence);

      setRecommendation(response.data.recommendation);

      setRisk(response.data.risk);

      // =============================
      // Audio Statistics
      // =============================

      setDuration(response.data.duration);

      setSampleRate(response.data.sample_rate);

      setAnalysisTime(response.data.analysis_time);

      setRmsEnergy(response.data.rms_energy);

      setZeroCrossingRate(
        response.data.zero_crossing_rate
      );

      setSpectralCentroid(
        response.data.spectral_centroid
      );

      setSpectralBandwidth(
        response.data.spectral_bandwidth
      );

      // =============================
      // Loading Animation
      // =============================

      setLoadingStep("Extracting Audio Features...");

      setTimeout(() => {

        setLoadingStep(
          "Computing Audio Statistics..."
        );

      }, 700);

      setTimeout(() => {

        setLoadingStep(
          "Running Random Forest Model..."
        );

      }, 1400);

      setTimeout(() => {

        setLoadingStep(
          "Generating Recommendation..."
        );

      }, 2100);

      setTimeout(() => {

        setLoadingStep(
          "Generating PDF Report..."
        );

      }, 2800);

      setTimeout(() => {

        setLoading(false);

        setIsUploading(false);

        setMessage("Successful");

        loadHistory();

        loadDashboard();

        loadChartData();

      }, 3500);

    } catch (error) {

      console.error(error);

      setLoading(false);

      setIsUploading(false);

      setMessage("Failed");

    }

  };

  // =============================
  // Download Report
  // =============================

  const downloadReport = async () => {

    try {

      const response = await api.get(
        "/upload/report",
        {
          responseType: "blob",
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "AcousticSpace_Report.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

    } catch (error) {

      console.error(error);

      alert("Unable to download report.");

    }

  };

  // =============================
  // Drag Events
  // =============================

  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>
  ) => {

    e.preventDefault();

    e.stopPropagation();

    if (
      e.type === "dragenter" ||
      e.type === "dragover"
    ) {

      setDragActive(true);

    } else {

      setDragActive(false);

    }

  };

  // =============================
  // Drop Audio
  // =============================

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {

    e.preventDefault();

    e.stopPropagation();

    setDragActive(false);

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0
    ) {

      const selectedFile =
        e.dataTransfer.files[0];

      setFile(selectedFile);

      setAudioUrl(
        URL.createObjectURL(selectedFile)
      );

      resetAnalysis();

    }

  };

  // =============================
  // Choose Audio
  // =============================

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (
      !e.target.files ||
      e.target.files.length === 0
    )
      return;

    const selectedFile =
      e.target.files[0];

    setFile(selectedFile);

    setAudioUrl(
      URL.createObjectURL(selectedFile)
    );

    resetAnalysis();

  };

  return (
  <Box
    sx={{
      minHeight: "100vh",
      background:
        "linear-gradient(to bottom,#eef5ff,#f9fbff)",
      py: 5,
      px: 2,
    }}
  >
    <Paper
      elevation={12}
      sx={{
        maxWidth: 1200,
        width: "100%",
        mx: "auto",
        p: 5,
        borderRadius: 5,
        background:
          "linear-gradient(to bottom,#ffffff,#fafafa)",
        boxShadow: "0 15px 45px rgba(0,0,0,0.08)",
      }}
    >
      {/* ================= HERO SECTION ================= */}

      <Box
        sx={{
          mb: 6,
          borderRadius: 5,
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#1565C0,#42A5F5)",
          color: "#fff",
          position: "relative",
          p: {
            xs: 4,
            md: 6,
          },
          textAlign: "center",
        }}
      >
        {/* Decorative Circle */}

        <Box
          sx={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,.10)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -70,
            left: -40,
            width: 250,
            height: 250,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,.08)",
          }}
        />

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: 1,
            position: "relative",
          }}
        >
          🎙 AcousticSpace
        </Typography>

        <Typography
          variant="h5"
          sx={{
            opacity: .95,
            mb: 2,
            position: "relative",
          }}
        >
          AI Powered Deepfake Audio Detection
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 760,
            mx: "auto",
            lineHeight: 1.8,
            opacity: .92,
            position: "relative",
          }}
        >
          Detect AI-generated and manipulated
          audio using acoustic feature
          extraction, waveform visualization,
          confidence scoring and interactive
          analytics dashboard.
        </Typography>

        {/* Technology Badges */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 4,
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <Paper
            sx={{
              px: 2,
              py: 1,
              borderRadius: 10,
              bgcolor: "rgba(255,255,255,.18)",
              color: "#fff",
            }}
          >
            ⚛ React
          </Paper>

          <Paper
            sx={{
              px: 2,
              py: 1,
              borderRadius: 10,
              bgcolor: "rgba(255,255,255,.18)",
              color: "#fff",
            }}
          >
            🚀 FastAPI
          </Paper>

          <Paper
            sx={{
              px: 2,
              py: 1,
              borderRadius: 10,
              bgcolor: "rgba(255,255,255,.18)",
              color: "#fff",
            }}
          >
            🤖 Machine Learning
          </Paper>

          <Paper
            sx={{
              px: 2,
              py: 1,
              borderRadius: 10,
              bgcolor: "rgba(255,255,255,.18)",
              color: "#fff",
            }}
          >
            📊 Dashboard
          </Paper>
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 4,
            opacity: .85,
          }}
        >
          Analyze • Detect • Report
        </Typography>
      </Box>

      {/* ================= Upload ================= */}

      <UploadCard
        dragActive={dragActive}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        onFileSelect={handleFileSelect}
      />

      {/* ================= Selected File ================= */}

      <SelectedFileCard
        file={file}
        analysisTime={analysisTime}
      />

      {/* ================= Audio Waveform ================= */}

      <AudioWaveform
        audioUrl={audioUrl}
      />

      {/* ================= Statistics ================= */}

      <StatisticsCard
        duration={duration}
        sampleRate={sampleRate}
        rmsEnergy={rmsEnergy}
        zeroCrossingRate={zeroCrossingRate}
        spectralCentroid={spectralCentroid}
        spectralBandwidth={spectralBandwidth}
      />

      {/* ================= Analyze Button ================= */}

      <Box
        sx={{
          mt: 5,
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          onClick={uploadAudio}
          sx={{
            px: 6,
            py: 1.6,
            borderRadius: 4,
            fontWeight: "bold",
            fontSize: 17,
            textTransform: "none",
          }}
        >
          Analyze Audio
        </Button>
      </Box>

            {/* ================= Loading ================= */}

      <LoadingCard
        loading={loading}
        loadingStep={loadingStep}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />

      {/* ================= Alert ================= */}

      <AlertCard
        message={message}
      />

      {/* ================= Prediction ================= */}

      {prediction && (
        <PredictionCard
          prediction={prediction}
          confidence={confidence}
          risk={risk}
          recommendation={recommendation}
          downloadReport={downloadReport}
        />
      )}

      {/* ========================================================= */}
      {/*                  Analytics Dashboard                      */}
      {/* ========================================================= */}

      <Paper
        elevation={4}
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 4,
          bgcolor: "#fafafa",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 4,
          }}
        >
          📈 Analytics Dashboard
        </Typography>

        <DashboardCards
          total={dashboard.total}
          real={dashboard.real}
          spoof={dashboard.spoof}
          averageConfidence={dashboard.average_confidence}
        />

        <Box sx={{ mt: 5 }}>
          <PredictionChart
            real={dashboard.real}
            spoof={dashboard.spoof}
          />
        </Box>

        <Box sx={{ mt: 5 }}>
          <ConfidenceChart
            data={chartData}
          />
        </Box>
      </Paper>

      {/* ========================================================= */}
      {/*                    Analysis History                       */}
      {/* ========================================================= */}

      <Paper
        elevation={4}
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
          }}
        >
          📜 Analysis History
        </Typography>

        <HistoryTable
          history={history}
          loadHistory={loadHistory}
          loadDashboard={loadDashboard}
          loadChartData={loadChartData}
        />
      </Paper>

    </Paper>
  </Box>
);

}

export default Upload;