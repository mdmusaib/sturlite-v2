// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Line } from 'react-chartjs-2'

const ChartjsLineChart = props => {
  // ** Props
  const { white, primary, success, warning, labelColor, borderColor, legendColor,chartData } = props

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // x: {
      //   ticks: { color: labelColor },
      //   grid: {
      //     color: borderColor
      //   }
      // },
      // y: {
      //   min: 0,
      //   max: 1000,
      //   ticks: {
      //     stepSize: 10000,
      //     color: labelColor
      //   },
      //   grid: {
      //     color: borderColor
      //   }
      // }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true
        }
      },
      tooltip:{
        callbacks:{
          label: function(context) {
            let label = context.dataset.sales[context.dataIndex] + "-" +context.dataset.data[context.dataIndex] || '';
            console.log(context);

            return label;
          }
        }
      },
    }
  }

  const data = {
    labels: chartData && chartData.map(d=>new Date(d.DocDate).toLocaleDateString()),
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'Sales Person',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: primary,
        backgroundColor: primary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: primary,
        data:chartData && chartData.map(d=>parseInt(d.Sales)),
        sales:chartData && chartData.map(d=>d.SlpName)
      },
      
      // {
      //   fill: false,
      //   tension: 0.5,
      //   label: 'Date',
      //   pointRadius: 1,
      //   pointHoverRadius: 5,
      //   pointStyle: 'circle',
      //   borderColor: warning,
      //   backgroundColor: warning,
      //   pointHoverBorderWidth: 5,
      //   pointHoverBorderColor: white,
      //   pointBorderColor: 'transparent',
      //   pointHoverBackgroundColor: warning,
      //   data: chartData && chartData.map(d=>parseInt(d.Sales))
      // },
      // {
      //   fill: false,
      //   tension: 0.5,
      //   pointRadius: 1,
      //   label: 'Sales',
      //   pointHoverRadius: 5,
      //   pointStyle: 'circle',
      //   borderColor: success,
      //   backgroundColor: success,
      //   pointHoverBorderWidth: 5,
      //   pointHoverBorderColor: white,
      //   pointBorderColor: 'transparent',
      //   pointHoverBackgroundColor: success,
      //   data: chartData && chartData.map(d=>parseInt(d.Sales))
      // }
    ]
  }

  return (
    <Card>
      <CardHeader title='Sales Report- Line chart' subheader='' />
      <CardContent>
        <Line data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsLineChart
