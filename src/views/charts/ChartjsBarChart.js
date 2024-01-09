// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import format from 'date-fns/format'
import { Bar } from 'react-chartjs-2'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ChartjsBarChart = props => {
  // ** Props
  const { yellow, labelColor, borderColor,chartData } = props



  // ** States
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  

  // api call


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: 50
  },
    scales: {
      // x: {
      //   grid: {
      //     color: borderColor
      //   },
      //   ticks: { color: labelColor }
      // },
      // y: {
      //   min: 0,
      //   max: 400,
      //   grid: {
      //     color: borderColor
      //   },
      //   ticks: {
      //     stepSize: 100,
      //     color: labelColor
      //   }
      // }
    },
    plugins: {
      legend: { display: true, position: 'bottom'  ,
      labels: {
          fontColor: '#333',
      } },
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
        label:'X - Sales Date, Y - Sales',
        maxBarThickness: 8,
        backgroundColor: ["red", "blue", "green", "blue", "red", "blue"],
        borderRadius: { topRight: 15, topLeft: 15 },
        data: chartData && chartData.map(d=>d.Sales),
        sales:chartData && chartData.map(d=>d.SlpName)
      }
    ]
  }

  // const CustomInput = forwardRef(({ ...props }, ref) => {
  //   const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  //   const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  //   const value = `${startDate}${endDate !== null ? endDate : ''}`

  //   return (
  //     <CustomTextField
  //       {...props}
  //       value={value}
  //       inputRef={ref}
  //       InputProps={{
  //         startAdornment: (
  //           <InputAdornment position='start'>
  //             <Icon fontSize='1.25rem' icon='tabler:calendar-event' />
  //           </InputAdornment>
  //         ),
  //         endAdornment: (
  //           <InputAdornment position='end'>
  //             <Icon fontSize='1.25rem' icon='tabler:chevron-down' />
  //           </InputAdornment>
  //         )
  //       }}
  //     />
  //   )
  // })

  // const handleOnChange = dates => {
  //   const [start, end] = dates
  //   setStartDate(start)
  //   setEndDate(end)
  // }

  return (
    <Card>
      <CardHeader
        title='Sales by Date'
      />
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsBarChart
