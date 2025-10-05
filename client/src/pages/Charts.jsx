import { useEffect, useRef, useState } from "react";
import { api } from "../services/api.js";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

export default function Charts() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const [metrics, setMetrics] = useState([]);

  // Load data once using useEffect hook
  useEffect(() => {
    api
      .get("/metrics")
      .then((r) => r.json())
      .then(setMetrics);
  }, []);

  // Build chart whenever data changes
  useEffect(() => {
    if (!canvasRef.current) return;

    const labels = metrics.map((m) => m.date);

    // Colors (red, blue, green, purple, yellow)
    const colors = {
      red: "rgba(239, 68, 68, 1)", // red
      blue: "rgba(59, 130, 246, 1)", // blue
      green: "rgba(34, 197, 94, 1)", // green
      purple: "rgba(168, 85, 247, 1)", // purple
      yellow: "rgba(234, 179, 8, 1)", // yellow
    };
    const fill = (c) => c.replace(", 1)", ", 0.15)");

    const datasets = [
      {
        label: "Squat (lbs)",
        data: metrics.map((m) => m.squat_lbs),
        borderColor: colors.red,
        backgroundColor: fill(colors.red),
        pointBackgroundColor: colors.red,
        tension: 0.3,
        fill: true,
      },
      {
        label: "Bench (lbs)",
        data: metrics.map((m) => m.bench_lbs),
        borderColor: colors.blue,
        backgroundColor: fill(colors.blue),
        pointBackgroundColor: colors.blue,
        tension: 0.3,
        fill: true,
      },
      {
        label: "Shoulder (lbs)",
        data: metrics.map((m) => m.shoulder_lbs),
        borderColor: colors.green,
        backgroundColor: fill(colors.green),
        pointBackgroundColor: colors.green,
        tension: 0.3,
        fill: true,
      },
      {
        label: "Vertical Jump (inches)",
        data: metrics.map((m) => m.vertical_jump_lbs),
        borderColor: colors.purple,
        backgroundColor: fill(colors.purple),
        pointBackgroundColor: colors.purple,
        tension: 0.3,
        fill: true,
      },
      {
        label: "Plank (sec)",
        data: metrics.map((m) => m.plank_seconds),
        borderColor: colors.yellow,
        backgroundColor: fill(colors.yellow),
        pointBackgroundColor: colors.yellow,
        tension: 0.3,
        fill: true,
      },
    ];

    // clearing
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current.getContext("2d"), {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: "Training Progress" },
          tooltip: { mode: "index", intersect: false },
        },
        interaction: { mode: "nearest", axis: "x", intersect: false },
        elements: { point: { radius: 5 } },
        scales: {
          x: { ticks: { autoSkip: true, maxRotation: 0 } },
          y: { beginAtZero: true },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [metrics]);

  return (
    <div className="container">
      <h2>Visualize</h2>
      <div className="chart">
        <canvas ref={canvasRef} width="820" height="420" />
      </div>
    </div>
  );
}
