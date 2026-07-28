import { formulaLibrary } from "./formulas.js";

const saved = JSON.parse(localStorage.getItem("graphData"));

if (!saved) {
  alert("No graph data found");
  window.location.href = "index.html";
}

document.querySelector("#backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

const { formula, vals, solvedVar, result } = saved;

const formulaData = formulaLibrary.find((f) => f.name === formula);

if (!formulaData) {
  alert("Formula not found");
  throw new Error("Formula not found");
}

// ==========================================
// GRAPH CONFIG
// ==========================================

const graphInfo = formulaData.graphConfig?.[solvedVar];

if (!graphInfo) {
  alert("Graph config missing");
  throw new Error("Graph config missing");
}

// ==========================================
// UI
// ==========================================

document.getElementById("graphTitle").innerText = formulaData.label;

document.getElementById("graphAnswer").innerText =
  `Answer: ${result.toFixed(2)} ${graphInfo.unit}`;

// ==========================================
// DRAW GRAPH
// ==========================================

drawGraph(formulaData, vals, result, graphInfo);

function drawGraph(data, vals, result, graphInfo) {
  const points = data.generateGraph(vals);

  // Dynamic highlight position
  const highlightX = Number(vals[graphInfo.x]);

  const canvas = document.getElementById("graphCanvas");

  // Destroy previous chart if exists
  if (window.graphInstance) {
    window.graphInstance.destroy();
  }

  window.graphInstance = new Chart(canvas, {
    type: "line",

    data: {
      datasets: [
        // MAIN GRAPH
        {
          label: data.label,

          data: points,

          borderColor: "#00ff88",

          backgroundColor: "#00ff88",

          borderWidth: 3,

          tension: 0.35,

          pointRadius: 0,

          pointHoverRadius: 7,

          fill: false,
        },

        // CURRENT POINT
        {
          label: "Current State",

          data: [
            {
              x: highlightX,
              y: result,
            },
          ],

          showLine: false,

          pointBackgroundColor: "red",

          pointBorderColor: "white",

          pointBorderWidth: 3,

          pointRadius: 9,

          pointHoverRadius: 13,

          hoverBackgroundColor: "#ff4444",

          hitRadius: 20,

          pointStyle: "circle",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      animation: false,

      normalized: true,

      interaction: {
        mode: "nearest",
        intersect: false,
      },

      hover: {
        mode: "nearest",
        intersect: false,
        animationDuration: 0,
      },

      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },

        // ==========================================
        // TOOLTIP
        // ==========================================

        tooltip: {
          enabled: true,

          animation: false,

          backgroundColor: "#111",

          titleColor: "#00ffcc",

          bodyColor: "white",

          borderColor: "#00ffcc",

          borderWidth: 1,

          padding: 12,

          displayColors: false,

          callbacks: {
            title() {
              return "Physics Data";
            },

            label(context) {
              const x = context.parsed.x.toFixed(2);

              const y = context.parsed.y.toFixed(2);

              return [
                `Coordinate: (${x}, ${y})`,
                `${data.xAxisLabel}: ${x}`,
                `${graphInfo.yLabel}: ${y} ${graphInfo.unit}`,
              ];
            },
          },
        },
      },

      // ==========================================
      // AXES
      // ==========================================

      scales: {
        x: {
          type: "linear",

          title: {
            display: true,
            text: data.xAxisLabel,
            color: "white",
          },

          ticks: {
            color: "white",
          },

          grid: {
            color: "#222",
          },
        },

        y: {
          title: {
            display: true,
            text: `${graphInfo.yLabel} (${graphInfo.unit})`,
            color: "white",
          },

          ticks: {
            color: "white",
          },

          grid: {
            color: "#222",
          },
        },
      },
    },

    // ==========================================
    // CROSSHAIR PLUGIN
    // ==========================================

    plugins: [
      {
        id: "crosshairLine",

        afterDraw(chart) {
          if (!chart.tooltip?._active?.length) return;

          const ctx = chart.ctx;

          const activePoint = chart.tooltip._active[0];

          const x = activePoint.element.x;

          const y = activePoint.element.y;

          const topY = chart.scales.y.top;

          const bottomY = chart.scales.y.bottom;

          const leftX = chart.scales.x.left;

          const rightX = chart.scales.x.right;

          ctx.save();

          ctx.beginPath();

          // Vertical line
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);

          // Horizontal line
          ctx.moveTo(leftX, y);
          ctx.lineTo(rightX, y);

          ctx.lineWidth = 1;

          ctx.strokeStyle = "rgba(255,255,255,0.4)";

          ctx.stroke();

          ctx.restore();
        },
      },
    ],
  });
}
