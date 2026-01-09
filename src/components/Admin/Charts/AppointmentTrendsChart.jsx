// components/Dashboard/Charts/AppointmentTrendsChart.jsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AppointmentTrendsChart({ data }) {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Total Appointments',
        data: data.map(item => item.total),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 6,
      },
      {
        label: 'Completed',
        data: data.map(item => item.completed),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 6,
      },
      {
        label: 'Cancelled',
        data: data.map(item => item.cancelled),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e7eb',
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)'
        },
        ticks: {
          color: '#9ca3af',
          stepSize: 5
        }
      }
    }
  };

  return (
    <div className="h-80">
      <Bar data={chartData} options={options} />
    </div>
  );
}