// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import TableFilter from 'src/views/table/data-grid/TableFilter'





const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))



const GenericDataTable = (props) => {

  return (
    <Grid container spacing={6}>
      {/* <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/x/react-data-grid/' target='_blank'>
              {props.title||"Data Grid"}
            </LinkStyled>
          </Typography>
        }
        subtitle={
          <Typography sx={{ color: 'text.secondary' }}>
            {props.description || "Data Grid is a fast and extendable react data table and react data grid."}
          </Typography>
        }
      /> */}
      <Grid item xs={12}>
        <TableFilter {...props}/>
      </Grid>
      
    </Grid>
  )
}

export default GenericDataTable
