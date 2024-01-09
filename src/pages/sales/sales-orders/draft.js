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
import CustomChip from 'src/@core/components/mui/chip';

const API_BASE_URL = `http://51.38.17.25:50001/b1s/v1/view.svc`;

const COLUMN = [
    {
      flex: 0.05,
      minWidth: 100,
      field: 'DocNum',
      headerName: 'Doc No'
    },
    {
      flex: 0.05,
      minWidth: 120,
      field: 'DocDate',
      headerName: 'Doc Date'
    },
    {
      flex: 0.15,
      minWidth: 300,
      field: 'CardName',
      headerName: 'Customer',
      align: 'center',
      headerAlign: 'center',
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'Doc Entry',
      align: 'center',
      headerAlign: 'center',
      headerName: 'Amount',
      renderCell: (params) => {
        const price = params.row.DocumentLines ? params.row.DocumentLines[0].Price : 0;
  
        return (
          <>{price.toFixed(2)}</>
        )
      }
    },
    {
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      field: 'DownPaymentStatus',
      headerName: 'Status',
      renderCell: (params) => {
        return (
          <>{
            params.row.DownPaymentStatus === "so_Open" ?
              <CustomChip label='Open' skin='light' color='success' size="small" />
              :
              <CustomChip label='Close' skin='light' color='error' size="small" />}
          </>)
      }
    },
    {
      minWidth: 100,
      field: '',
      align: 'center',
      headerAlign: 'center',
      headerName: 'Action',
      renderCell: (params) => {
        return (
          <>{params.row.DocNum ?
            <Grid style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Link href={`view-order/${params.row.DocEntry}`} >
                  <IconButton aria-label='capture screenshot' color='secondary' size='large'>
                    <Icon icon='material-symbols:edit' fontSize={18} style={{ color: "#4361ee" }} />
                  </IconButton>
                </Link>
              </div>
              <div>
                <Link href={`preview-order/${params.row.DocEntry}`} >
                  <IconButton aria-label='capture screenshot' color='secondary' size='large'>
                    <Icon icon='carbon:view' fontSize={18} style={{ color: "#4361ee" }} />
                  </IconButton>
                </Link>
              </div>
            </Grid>
            : null}
          </>)
      },
    }
  ];

const DraftOrder = () => {
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

    const APIURL = `http://51.38.17.25:50001/b1s/v1/Drafts?$select=DocEntry,DocNum,DocType &$orderby=DocEntry&$top=10&$skip=1`;

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

  return (
    <Card>
      <CardHeader title='Sales Order Waiting For Approval' />
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
          <Link href='/sales/sales-orders/add-sales-order'>
            <Button variant='contained'>Create</Button>
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

export default DraftOrder;
