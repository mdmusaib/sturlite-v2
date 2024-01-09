// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import Button from '@mui/material/Button'

// ** MUI Imports

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { useRouter } from 'next/router'
import moment from 'moment'

// ** Third Party Components
import axios from 'axios'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const SAP_BASE_URL = process.env.NEXT_PUBLIC_SAP_BASE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL




const CUSTOMERS = `${BASE_URL}/Query/ExecuteQuery?dbtype=HANA&query=select * from MBM_TEST_DB.EL_BPMaster_B1SLQuery LIMIT 5000 OFFSET 0`;
const IEAMCODEAPI = `${SAP_BASE_URL}/Items()?$select=ItemCode,ItemName`;
const ITEMSGROUP = `${SAP_BASE_URL}/ItemGroups()?$select=GroupName,Number&$orderby=Number desc`;


const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const HeaderTitle = styled(Typography)({
  fontWeight: 700,
  lineHeight: '24px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})


const InvoicePrint = () => {

  const CREDENTIALS = window.localStorage.getItem("CREDENTIALS")

  // ** State
  const theme = useTheme()
  useEffect(() => {
    setTimeout(() => {
      // window.print()
    }, 100)
  }, [])
  const router = useRouter();
  const { id } = router.query;

  const [itemData, setIteamData] = useState([])


  const [totalCount, setTotalCount] = useState({

    "Total_Before_Discount": 0.00,
    "Discount": 0.00,
    "Rounding": 0.00,
    "Tax": 0.00,
    "Total": 0.00
  })

  const [formData, setFormData] = useState({
    "CardCode": "",
    "Comments": "",
    "DocDueDate": "",
    "GroupNumber": "",
    "DocEntry": "",
    "DocDate": moment().format('YYYY-MM-DD'),
    "DocumentLines": [
      {
        "LineNum": 0,
        "ItemCode": "",
        "Quantity": 0,
        "UnitPrice": 0,
        "StgDesc": "",
        "TaxTotal": 0,
        "Total": 0,
        "TotalDis": 0
      }
    ]
  })



  useEffect(() => {
    const GETSALESORDER = `${SAP_BASE_URL}/Orders(${id})`;

    const getfetchData = async () => {

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + CREDENTIALS,
          'Content-Type': 'application/json'
        }
      }

      fetch(GETSALESORDER, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          return response.json();
        })
        .then(data => {
          console.log(data);
          const { DocumentLines, SalesPersonCode, BPL_IDAssignedToInvoice, DocDueDate, Comments, CardCode, DocDate, DocEntry, Address, Address2, CardName } = data;

          const newObj = {
            "CardName": CardName,
            "CardCode": CardCode,
            "Comments": Comments,
            "DocDate": DocDate,
            "DocEntry": DocEntry,
            "DocDueDate": DocDueDate,
            "Address": Address,
            "Address2": Address2,
            "BPL_IDAssignedToInvoice": BPL_IDAssignedToInvoice,
            "SalesPersonCode": SalesPersonCode,
            "DocumentLines": DocumentLines
          }
          setFormData({ ...newObj })

          handleOnUpdate(DocumentLines, newObj)
        })
        .catch(error => console.error('SAP API request failed:', error))
    }
    if (id) {
      getfetchData()
    }
  }, [id])

  const handleOnUpdate = (DocumentLines, rest) => {

    const ArrayObj = DocumentLines
    const valid = ArrayObj[0]

    if (valid.ItemCode) {
      const newObj = ArrayObj.map((e, i) => {
        if (e.ItemCode) {
          const quantity = Number(e.Quantity || 0)
          const unitPrice = Number(e.UnitPrice || 0)
          const discount = e.StgDesc ? (Number(e.StgDesc) / 100) : null

          var total = 0;
          var afterDis = 0;

          if (discount) {
            afterDis = unitPrice * discount;
            const finalPrice = unitPrice - afterDis;
            total = quantity * finalPrice
          } else {

            total = (quantity * unitPrice)
          }

          const data = { ...e, "Total": total.toFixed(2), "TotalDis": afterDis * quantity };

          return data;
        }

        return e;
      })
      const restValue = rest ? { ...rest } : { ...formData }
      setFormData({
        ...restValue,
        DocumentLines: newObj
      })

      const totalBeforeDiscount = newObj.reduce((acc, cur) => acc + cur.Quantity * cur.UnitPrice, 0);
      const discount = newObj.reduce((acc, cur) => acc + cur.TotalDis, 0)// assuming 10% discount
      const tax = newObj.reduce((acc, cur) => acc + cur.TaxTotal, 0) * 0.1; // assuming 10% tax
      const total = totalBeforeDiscount - discount + tax;

      setTotalCount({
        "Total_Before_Discount": totalBeforeDiscount.toFixed(2),
        "Discount": discount.toFixed(2),
        "Rounding": 0.00,
        "Tax": tax.toFixed(2),
        "Total": total.toFixed(2)
      });
    }


  }


  useEffect(() => { }, [itemData, totalCount]);

  return (
    <>
      <Box style={{ background: "#fff", padding: "48px", "boxShadow": " 0px 2px 6px 0px rgba(47, 43, 61, 0.14)" }}>
        <Grid container >
          <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Grid xs={12} sx={{ display: "flex", flex: "wrap", pb: 6 }}>
                <img src="/sturlite.jpeg" width={40} alt="MBM.india.pvt.Ltd" />
                {/* <HeaderTitle variant='h4' sx={{ ml: 4 }} >
                  {themeConfig.templateName}
                </HeaderTitle> */}
              </Grid>
              <div>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>Address: 36/8,
                  Balfour Road, <br></br>  Kilpauk, Chennai, <br></br>Tamil Nadu 600010.</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'flex-end', xs: 'flex-start' } }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {`Order #${formData.DocEntry}`}
              </Typography>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary' }}>Date Issued:</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{formData.DocDate && moment(formData.DocDate).format("DD-MM-YYYY")}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary' }}>Date Due:</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{formData.DocDueDate && moment(formData.DocDueDate).format("DD-MM-YYYY")}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />

        <Grid container sx={{ padding: 2.5 }}>
          <Grid item xs={7} md={8} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Typography variant='h6' sx={{ mb: 3.5, fontWeight: 600 }}>
              Customer Name
            </Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{formData.CardName}</Typography>
            {/*<Typography sx={{ mb: 2, color: 'text.secondary' }}>invoice.company</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>invoice.address</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>invoice.contact</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>invoice.companyEmail</Typography>*/}
          </Grid>
          <Grid item xs={5} md={4}>
            {/*<Typography variant='h6' sx={{ mb: 3.5, fontWeight: 600 }}>
               Item Group:
          </Typography>*/}
            <Table>
              {/* <TableBody>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Total Due:</MUITableCell>
                  <MUITableCell sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    paymentDetails.totalDue
                  </MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Bank name:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>paymentDetails.bankName</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Country:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>paymentDetails.country</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>IBAN:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>paymentDetails.iban</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>SWIFT code:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>paymentDetails.swiftCode</MUITableCell>
                </TableRow>
          </TableBody>*/}
            </Table>
          </Grid>
        </Grid>

        <Divider sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: '0 !important', padding: 2.5 }} />

        <Table sx={{ padding: 2.5 }} >
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>UnitPrice</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Taxcode</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& .MuiTableCell-root': {
                py: `$theme.spacing(2.5) !important`,

                //fontSize: theme.typography.body1.fontSize

              }
            }}
          >
            {formData.DocumentLines.map((e, i) => {

              return (
                <TableRow key={i}>
                  <TableCell>{formData.DocumentLines[i].ItemDescription}</TableCell>
                  <TableCell>{formData.DocumentLines[i].Quantity}</TableCell>
                  <TableCell>{formData.DocumentLines[i].UnitPrice}</TableCell>
                  <TableCell>{formData.DocumentLines[i].DiscountPercent}</TableCell>
                  <TableCell>{formData.DocumentLines[i].TaxCode}</TableCell>
                  <TableCell>{formData.DocumentLines[i].OpenAmount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Grid container sx={{ padding: 5 }}>
          <Grid item xs={8} sm={7} lg={9}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Sales Person Code:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{formData.SalesPersonCode}</Typography>
            </Box>

            <Typography sx={{ color: 'text.secondary' }}>{formData.Comments}</Typography>
          </Grid>
          <Grid item xs={4} sm={5} lg={3}>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Subtotal:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{totalCount.Total_Before_Discount}</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Discount:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{totalCount.Discount}</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Rounding:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{totalCount.Rounding}</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Tax:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{totalCount.Tax}</Typography>
            </CalcWrapper>
            <Divider />
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Total:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{totalCount.Total}</Typography>
            </CalcWrapper>
          </Grid>
        </Grid>

        <Button
          fullWidth
          sx={{ mb: 2 }}
          target='_blank'
          variant='tonal'
          component={Link}
          color='secondary'
          href={`/sales/print-order/${id}`}
        >
          Print
        </Button>
      </Box>
    </>
  )
}

export default InvoicePrint
