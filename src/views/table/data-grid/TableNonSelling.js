import { React, useState } from 'react'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' // Import the CSS file

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

// ** Custom Component Imports
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'
import { Input } from '@mui/material'

const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'S.no'
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'category_name',
    headerName: 'Category Name'
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'qty',
    headerName: 'Qty'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'target',
    editable: true,
    headerName: 'Target'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'bal',
    headerName: 'Bal'
  },
  {
    flex: 0.25,
    field: 'remarks',
    minWidth: 200,
    editable: true,
    headerName: 'Remarks'
  }
]

const TableNonSelling = ({ popperPlacement }) => {
  // ** States
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  return (
    <Card>
      <CardHeader title='Non Selling Agent wise' />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
        <div style={{ marginLeft: '20px' }}>
          <DatePicker
            selected={fromDate}
            id='from-date-input'
            popperPlacement={popperPlacement}
            onChange={date => setFromDate(date)}
            placeholderText='Click to select a date'
            customInput={<CustomInput label='From Date' />}
            dateFormat='dd/MM/yyyy'
          />
        </div>
        <div>
          <DatePicker
            selected={toDate}
            id='to-date-input'
            popperPlacement={popperPlacement}
            onChange={date => setToDate(date)}
            placeholderText='Click to select a date'
            customInput={<CustomInput label='To Date' />}
            dateFormat='dd/MM/yyyy'
          />
        </div>
        <div>
          <CustomTextField type='text' label='Product Name' placeholder='Type Name' />
        </div>
        <div className='demo-space-x'>
          <Button variant='contained'>Show</Button>
        </div>
        <div className='demo-space-x'>
          <Button variant='contained' color='secondary'>
            Save
          </Button>
        </div>
      </Box>
      <br></br>
      <Box sx={{ height: 500 }}>
        <DataGrid columns={columns} rows={rows.slice(0, 10)} />
      </Box>
    </Card>
  )
}

export default TableNonSelling
