// components/Dashboard/Charts/ClientDemographicsChart.jsx
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ClientDemographicsChart({ data }) {
  if (!data) return null;

  const peakHours = data.peak_hours || [];
  const popularDays = data.popular_days || [];

  const chartData = {
    labels: peakHours.map(item => item.hour),
    datasets: [
      {
        label: 'Appointments by Hour',
        data: peakHours.map(item => item.appointments),
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: '#8b5cf6',
        borderWidth: 2,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#8b5cf6'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(75, 85, 99, 0.3)'
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)'
        },
        pointLabels: {
          color: '#9ca3af',
          font: {
            size: 12
          }
        },
        ticks: {
          color: '#9ca3af',
          backdropColor: 'transparent'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb'
        }
      }
    }
  };

  return (
    <div className="h-80">
      <Radar data={chartData} options={options} />
    </div>
  );
}