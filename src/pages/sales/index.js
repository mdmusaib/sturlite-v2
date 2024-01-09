import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon';
import IconButton from '@mui/material/IconButton';
import moment from 'moment'
import toast from 'react-hot-toast'
import CustomTextField from 'src/@core/components/mui/text-field'
import GenericDataTable from 'src/pages/tables/data-grid'

const API_BASE_URL = `http://51.38.17.25:50001/b1s/v1/view.svc`;

const COLUMN = [
  {
    flex: 0.07,
    minWidth: 120,
    align: 'center',
    headerAlign: 'center',
    field: 'CardCode',
    headerName: 'Document No'
  },
  {
    flex: 0.07,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
    field: 'CreateDate',
    headerName: 'Document Date',
    renderCell: (params) => <>{params.row.CreateDate ? moment(params.row.CreateDate).format("DD-MM-YYYY") : null}</>
  },
  {
    flex: 0.15,
    minWidth: 100,
    align: 'center',
    headerAlign: 'center',
    field: 'CardName',
    headerName: 'Company Ref. Name'
  },
  {
    flex: 0.05,
    minWidth: 100,
    align: 'center',
    headerAlign: 'center',
    field: 'Address',
    headerName: 'Address'
  },
  {
    flex: 0.08,
    minWidth: 100,
    align: 'center',
    headerAlign: 'center',
    field: 'BPLName',
    headerName: 'District'
  },
  {
    flex: 0.05,
    minWidth: 100,
    align: 'center',
    headerAlign: 'center',
    field: 'state',
    headerName: 'State'
  },
  {
    flex: 0.05,
    minWidth: 50,
    align: 'center',
    headerAlign: 'center',
    headerName: 'Action',
    renderCell: (params) => {
      return (
        <>{params.row.CardCode ? <Link href={`sales/view-lead/${params.row.CardCode}`}>
          <IconButton aria-label='capture screenshot' color='secondary' size='large'>
            <Icon icon='material-symbols:edit-outline' fontSize={18} style={{ color: "#4361ee" }} />
          </IconButton>
        </Link> : null}
        </>)
    },
  },
];

const LeadListComponent = () => {
  const pageSize={ page: 0, pageSize: 5 };
  const CREDENTIALS = window.localStorage.getItem("CREDENTIALS")

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + CREDENTIALS,
      Prefer: 'odata.maxpagesize=50',
      'Content-Type': 'application/json',
    }
  }

  const fetchData = async () => {
    setLoading(true);

    const APIURL = `${API_BASE_URL}/EL_BPMaster_B1SLQuery()?$filter=CardType eq 'L' and BPLId eq 1&$top=100&$skip=1&$inlinecount=allpages`;

    fetch(APIURL, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return response.json()
      })
      .then(data => {
        const value = data.value

        const newObj = value.map((e, i) => {
          const obj = { ...e, id: i + 1 }

          return obj;
        })
        setLoading(false)
        setData(newObj)
      })
      .catch(error => {
        setLoading(false)
        toast.error("Something went wrong!")
        console.error('SAP API request failed:', error.message);
      });
  };
  useEffect(() => {
    fetchData()
  }, [])

const handleCustomPagination=(page)=>{

  console.log(page);
}
  const Filter = `${API_BASE_URL}/BusinessPartners()?$filter=CardType eq 'L' and startswith(CardName,'${search}') & $orderby=CardCode &$inlinecount=allpages`;

//   const FilterData = () => {
//     setLoading(true)
//     fetch(Filter, requestOptions)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok')
//         }

//         return response.json()
//       })
//       .then(data => {
//         const value = data.value

//         const newObj = value.map((e, i) => {
//           const obj = { ...e, id: i + 1 }

//           return obj;
//         })
//         setLoading(false)
//         setData(newObj)
//       })
//       .catch(error => {
//         setLoading(false)
//         toast.error("Something went wrong!")
//         console.error('SAP API request failed:', error.message);
//       });
//   }

//   useEffect(() => {
//     search && search.length > 0 ? FilterData() : fetchData()
//   }, [search])

//   useEffect(() => { }, [data, search])

  return (
    <Card>
      <CardHeader title='Lead Master' />
      <Grid
        container
        spacing={5}
        sx={{
          p: 6,
          mt: -12,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
        <Grid item >
          <Link href='/sales/create-leads'>
            <Button variant='contained'>Create Lead</Button>
          </Link>
        </Grid>
      </Grid>
    {data.length>0 && <GenericDataTable
     handleCustomPagination={handleCustomPagination} 
     columns={COLUMN} 
     rows={data} 
     pageSize={pageSize}
     loading={loading}
     title="Lead List"
     description="View Lead List Data Table"/>}  
    
      {/* </Grid> */}
    </Card>
  )
}

export default LeadListComponent
