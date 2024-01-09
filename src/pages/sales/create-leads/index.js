import { React, forwardRef, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import LeadTabs from './Component/LeadTabs'
import Link from 'next/link'
import PageHeader from 'src/@core/components/page-header'
import CustomTextField from 'src/@core/components/mui/text-field'

const SAP_BASE_URL = process.env.NEXT_PUBLIC_SAP_BASE_URL



const BUSINESSPARTNES = `http://51.38.17.25:50001/b1s/v1/BusinessPartners()`

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Index = () => {
  const CREDENTIALS = window.localStorage.getItem("CREDENTIALS")

  const router = useRouter()
  const [addIndex, setAddIndex] = useState(0)
  const [contactIndex, setContactIndex] = useState(0)

  const [formData, setFormData] = useState({
    CardCode: '',
    CardType: 'L',
    CardName: "",
    CardForeignName:'',
    CreditLimit: "",
    GroupCode: 140,
    LanguageCode: 8,
    PanNumber:"",
    GstType: null,
    GSTIN: '',
    BPAddresses: [],
    ContactEmployees: [],
    BPFiscalTaxIDCollection:[]
  })

  const [addressObj, setAddressObj] = useState([
    {
      "key": 0,
      "AddressType": "bo_BillTo",
      "AddressName": "Bill To",
      'Country': "IN",
      'ZipCode': 600081,
      'City': "CHENNAI",
      'State': "AP",
      'BuildingFloorRoom': null,
      'GstType': null,
      'GSTIN': null,
    }])

  const [contactObj, setContactObj] = useState([
    {
      "key": 0,
      "CardCode": "T10003498",
      "Name": "1",
      "Address": null,
      'FirstName': null,
      'LastName': null,
      'MobilePhone': null,
      'Phone2': null,
      'Email':null,
      'Title': null,
      'Position': null,
      'Gender': "gt_Male",
      'Remarks1': null,
    }])
  


  const handleOnChange = (e) => {
    console.log(e,formData);
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOnSubmit = () => {

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + CREDENTIALS,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      redirect: 'follow'
    }

    fetch(BUSINESSPARTNES, requestOptions)
      .then(response => {
        toast.success('Successful')
      })
      .then(() => router.back())
      .catch(error => {
        toast.error("Network error")
        console.log(error)
      })
  }

  useEffect(() => { }, [contactObj, contactIndex, addIndex, addressObj])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='' target=''>
              Create Lead
            </LinkStyled>
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Card>
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <LeadTabs
                formData={formData}
                setFormData={setFormData}
                handleOnChange={handleOnChange}
                addressObj={addressObj}
                setAddressObj={setAddressObj}
                setAddIndex={setAddIndex}
                addIndex={addIndex}
                contactIndex={contactIndex}
                setContactIndex={setContactIndex}
                contactObj={contactObj}
                setContactObj={setContactObj}
              />
            </CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <CardActions>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'end', width: "100%" }} >
                <div className='demo-space-x'>
                  <Link href='/customer-master/customers/'>
                    <Button color='secondary' variant='tonal'>Back</Button>
                  </Link>
                  <Button type='submit' sx={{ mr: 2, mb: 4 }} variant='contained' onClick={() => handleOnSubmit()}>
                    Submit
                  </Button>
                </div>
              </Box>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid >
  )
}

export default Index
