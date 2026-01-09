// components/Dashboard/Charts/ServicePerformanceChart.jsx
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ServicePerformanceChart({ data }) {
  const colors = [
    '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
  ];

  const chartData = {
    labels: data.map(item => item.service),
    datasets: [
      {
        data: data.map(item => item.total_appointments),
        backgroundColor: colors,
        borderColor: colors.map(color => color + '80'),
        borderWidth: 2,
        borderRadius: 8,
        hoverOffset: 20
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#e5e7eb',
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((context.parsed / total) * 100);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="h-80">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}