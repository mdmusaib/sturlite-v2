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
  const { id } = router.query;
  const [addIndex, setAddIndex] = useState(0)
  const [contactIndex, setContactIndex] = useState(0)

  const [formData, setFormData] = useState({
    CardCode: '',
    CardType: 'L',
    CardName: "",
    CardForeignName:'',
    CreditLimit: "10000",
    GroupCode: 140,
    LanguageCode: 8,
    BPAddresses: [],
    ContactEmployees: [],
    BPFiscalTaxIDCollection:[]
  })

  const [addressObj, setAddressObj] = useState([
    {
      "key": 0,
      "AddressType": "bo_BillTo",
      "AddressName": "Bill To",
      'Country': null,
      'ZipCode': null,
      'City': null,
      'State': null,
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
      'Title': null,
      'Position': null,
      'Gender': "gt_Male",
      'Remarks1': null,
    }])

  const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  useEffect(() => {
    if (id) {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + CREDENTIALS,
          'Content-Type': 'application/json'
        }
      }
      fetch(`http://51.38.17.25:50001/b1s/v1/BusinessPartners('${id}')`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          return response.json();
        })
        .then(data => {

          const addressArray = []
          const contactArray = []

          setFormData({
            "CardCode": data.CardCode,
            "CardType": data.CardType,
            "CardName": data.CardName,
            "Website": data.Website,
            "Series": data.Series,
            "Phone1": data.Phone1,
            "ContactPerson": data.ContactPerson,
            "Phone2": data.Phone2,
            "Address": data.Address,
            "ZipCode": data.ZipCode,
            "SalesPersonCode": data.SalesPersonCode,
            "BPAddresses": [],
            "ContactEmployees": [],
          })

          const addArray = data?.BPAddresses?.map((e, i) => {
            const data = {
              "key": i,
              "AddressType": e.AddressType,
              "AddressName": e.AddressName,
              'Country': e.Country,
              'ZipCode': e.ZipCode,
              'City': e.City,
              'State': e.State,
              'BuildingFloorRoom': e.BuildingFloorRoom,
              'GstType': e.GstType,
              'GSTIN': e.GSTIN,
            }
            addressArray.push(data)
          })

          const conArray = data?.ContactEmployees?.map((e, i) => {
            const data = {
              "key": i,
              "CardCode": e.CardCode,
              "Name": e.Name,
              "Address": e.Address,
              'FirstName': e.FirstName,
              'LastName': e.LastName,
              'MobilePhone': e.MobilePhone,
              'Phone2': e.Phone2,
              'Title': e.Title,
              'Position': e.Position,
              'Gender': e.Gender,
              'Remarks1': e.Remarks1,
            }
            contactArray.push(data)
          })
          addressArray[0] ? setAddressObj(addressArray) : null
          contactArray[0] ? setContactObj(contactArray) : null
        })
        .catch(error => {
          toast.error("Network error")
          console.log(error)
        })
    }
  }, [id])

  const handleOnSubmit = () => {

    // toast.name("Currently not working")

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
        console.log(response)
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
              Customer
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
