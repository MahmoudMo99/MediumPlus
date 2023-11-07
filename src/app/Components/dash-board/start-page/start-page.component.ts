import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  // Chart data
  const chartData = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Mobile apps",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
      tension: 0,
      borderWidth: 0,
      pointRadius: 5,
      pointBackgroundColor: "rgba(255, 255, 255, .8)",
      pointBorderColor: "transparent",
      borderColor: "rgba(255, 255, 255, .8)",
      // borderWidth: 4,
      borderSize: 4,
      backgroundColor: "transparent",
      fill: true,
      maxBarThickness: 6
    }]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: 'rgba(255, 255, 255, .2)'
        },
        ticks: {
          display: true,
          padding: 10,
          color: '#f8f9fa',
          font: {
            size: 14,
            weight: 300,
            family: "Roboto",
            style: 'normal',
            lineHeight: 2
          }
        }
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          color: '#f8f9fa',
          padding: 10,
          font: {
            size: 14,
            weight: 300,
            family: "Roboto",
            style: 'normal',
            lineHeight: 2
          }
        }
      }
    }
  };

  const ctx = document.getElementById('chart-line-tasks') as HTMLCanvasElement;

  new Chart(ctx, {
    type: 'line',
    data: chartData,
    // options: chartOptions
  });
}
}
