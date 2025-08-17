import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
  annotationPlugin
);

function OilXPriceChart() {
  const [chartData, setChartData] = useState<any>(null);
  const dataRef = useRef<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });

  type PriceTick = {
    timestamp: string;
    price: string | number;
  };

  useEffect(() => {
    // Fetch initial ticks from MongoDB
    async function fetchInitialTicks() {
      const res = await fetch("/api/price-ticks?limit=100");
      const data = await res.json();
      if (Array.isArray(data.ticks)) {
        dataRef.current.labels = (data.ticks as PriceTick[]).map((tick) => {
          const d = new Date(tick.timestamp);
          return d.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        });
        dataRef.current.values = (data.ticks as PriceTick[]).map((tick) =>
          Number(tick.price)
        );
        setChartData({
          labels: [...dataRef.current.labels],
          datasets: [
            {
              label: "OILX Live Price (USD)",
              data: [...dataRef.current.values],
              borderColor: "rgba(251, 191, 36, 1)",
              backgroundColor: "rgba(251, 191, 36, 0.2)",
              tension: 0.2,
              pointRadius: Array(dataRef.current.values.length - 1)
                .fill(3)
                .concat([8]), // last point larger
              pointBackgroundColor: Array(dataRef.current.values.length - 1)
                .fill("rgba(251, 191, 36, 1)")
                .concat(["#22d3ee"]), // last point cyan
            },
          ],
        });
      }
    }

    // Fetch and persist new tick
    async function fetchAndSaveLatestPrice() {
      const priceRes = await fetch("/api/price");
      const priceData = await priceRes.json();
      let latest = null;
      if (priceData.price && typeof priceData.price === "string") {
        latest = Number(priceData.price.replace("$", ""));
      }
      if (latest !== null) {
        // Save to MongoDB
        await fetch("/api/price-tick", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: latest }),
        });
        const now = new Date();
        const label = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        dataRef.current.labels.push(label);
        dataRef.current.values.push(latest);
        if (dataRef.current.labels.length > 100) {
          dataRef.current.labels.shift();
          dataRef.current.values.shift();
        }
        setChartData({
          labels: [...dataRef.current.labels],
          datasets: [
            {
              label: "OILX Live Price (USD)",
              data: [...dataRef.current.values],
              borderColor: "rgba(251, 191, 36, 1)",
              backgroundColor: "rgba(251, 191, 36, 0.2)",
              tension: 0.2,
              pointRadius: 3,
            },
          ],
        });
      }
    }

    fetchInitialTicks();
    // Start live updates
    const interval = setInterval(fetchAndSaveLatestPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!chartData) return <div>Loading chart...</div>;

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 my-8">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.parsed.y;
                  if (context.dataIndex === context.dataset.data.length - 1) {
                    return `Latest Price: $${value.toFixed(7)}`;
                  }
                  return `OILX Price: $${value.toFixed(7)}`;
                },
              },
            },
            annotation:
              chartData && chartData.datasets[0].data.length > 0
                ? {
                    annotations: {
                      latestLabel: {
                        type: "label",
                        xValue: chartData.labels[chartData.labels.length - 1],
                        yValue:
                          chartData.datasets[0].data[
                            chartData.datasets[0].data.length - 1
                          ],
                        backgroundColor: "#22d3ee",
                        color: "#0f172a",
                        font: {
                          size: 12,
                          weight: "bold",
                        },
                        content: [
                          `$${chartData.datasets[0].data[
                            chartData.datasets[0].data.length - 1
                          ].toFixed(7)}`,
                        ],
                        padding: 6,
                        borderRadius: 6,
                        position: {
                          x: "end",
                          y: "center",
                        },
                      },
                    },
                  }
                : {},
          },
          scales: {
            x: { ticks: { color: "#fbbf24" } },
            y: { ticks: { color: "#fbbf24" } },
          },
        }}
      />
      {/* Annotation plugin handles the label next to the latest dot */}
      <div className="text-right text-xs text-cyan-400 mt-2">
        Live price updates every 1 minute from Coin Gecko
      </div>
    </div>
  );
}

export default OilXPriceChart;
