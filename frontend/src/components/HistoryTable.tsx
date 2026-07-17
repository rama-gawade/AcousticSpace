import React, { useState } from "react";

import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import api from "../services/api";

interface HistoryItem {
  id: number;
  filename: string;
  prediction: string;
  confidence: number;
  risk: string;
  created_at: string;
}

interface Props {
  history: any[];
  loadHistory: () => void;
  loadDashboard: () => void;
  loadChartData: () => void;
}

export default function HistoryTable({
  history,
  loadHistory,
  loadDashboard,
  loadChartData,
}: Props) {

  const [search, setSearch] = useState("");

  const filteredHistory = history.filter((item) =>
    item.filename
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const deleteAnalysis = async (id: number) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this analysis?"
  );

  if (!confirmDelete) return;

  try {

    await api.delete(`/history/${id}`);

    loadHistory();

    loadDashboard();

    loadChartData();

    

  } catch (error) {

    console.error(error);

    alert("Failed to delete analysis.");

  }
};

  return (
    <Paper
      elevation={5}
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        📜 Recent Analyses
      </Typography>

      <TextField
        fullWidth
        label="Search by filename"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
        }}
      />

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                <b>File Name</b>
              </TableCell>

              <TableCell>
                <b>Prediction</b>
              </TableCell>

              <TableCell>
                <b>Confidence</b>
              </TableCell>

              <TableCell>
                <b>Risk</b>
              </TableCell>

              <TableCell>
                <b>Date</b>
              </TableCell>

              <TableCell align="center">
                <b>Action</b>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredHistory.length > 0 ? (

              filteredHistory.map((item) => (

                <TableRow
                  key={item.id}
                  hover
                >

                  <TableCell>
                    {item.filename}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={item.prediction}
                      color={
                        item.prediction === "Real"
                          ? "success"
                          : "error"
                      }
                    />

                  </TableCell>

                  <TableCell>
                    {item.confidence.toFixed(2)}%
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={item.risk}
                      color={
                        item.risk === "High"
                          ? "error"
                          : item.risk === "Medium"
                          ? "warning"
                          : "success"
                      }
                    />

                  </TableCell>

                  <TableCell>
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="error"
                      onClick={() =>
                        deleteAnalysis(item.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No analysis history found.
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>
  );
}