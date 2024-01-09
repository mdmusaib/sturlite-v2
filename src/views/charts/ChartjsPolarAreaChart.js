// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { PolarArea } from 'react-chartjs-2'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

const ChartjsPolarAreaChart = props => {
  // ** Props
  const { info, grey, green, yellow, primary, warning, legendColor,chartData } = props

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 25,
          boxWidth: 9,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  }

  const data = {
    labels: chartData && chartData.map(d=>d.SlpName),
    datasets: [
      {
        borderWidth: 0,
        label:'Sales',
        data: chartData && chartData.sort((a,b) => b-a).slice(0,10).map(d=>d.Sales),
        sales:chartData && chartData.map(d=>d.SlpName),
        backgroundColor: [primary, yellow, warning, info, grey, green]
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Top 10 Sales'
        action={
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            options={['Refresh', 'Edit', 'Share']}
            iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
          />
        }
      />
      <CardContent>
        <PolarArea data={data} height={350} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsPolarAreaChart
