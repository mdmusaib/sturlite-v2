import { React, useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import CustomTextField from 'src/@core/components/mui/text-field'
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import moment from 'moment'
import { useRouter } from 'next/router';
import axios from 'axios'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import themeConfig from 'src/configs/themeConfig'
import { useAuth } from 'src/hooks/useAuth'
import { CustomeItemGroupFilter, GroupFilterObj } from 'src/component/CustomeItemGroupFilter/CustomeItemGroupFilter'
import CustomCustomer from 'src/component/CustomCustomer/CustomCustomer'

const SAP_BASE_URL = process.env.NEXT_PUBLIC_SAP_BASE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DB_NAME = process.env.NEXT_PUBLIC_DATABASE;
const DB_TYPE = process.env.NEXT_PUBLIC_DATABASE_TYPE;

const SALESQUOTATION = `${SAP_BASE_URL}/Orders() `;
const CUSTOMERS = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=select * from ${DB_NAME}.EL_BPMaster_B1SLQuery where "CardType"='C' LIMIT 10 OFFSET 0`;

const HeaderTitle = styled(Typography)({
    fontWeight: 700,
    lineHeight: '24px',
    transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})

const Index = () => {
    const { user } = useAuth()
    const CREDENTIALS = window.localStorage.getItem("CREDENTIALS")
    const router = useRouter();
    const { id } = router.query;
    const [customerDetails, setCustomerDetails] = useState([])
    const [customerData, setCustomerData] = useState([]);
    const [itemData, setIteamData] = useState([{ "data": [] }])
    const [itemDataObj, setItemDataObj] = useState([])
    const [shipData, setShipData] = useState()
    const [shipTo, setShipTo] = useState([])
    const [shipToValue, setShipToValue] = useState("")

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
        "DocDate": moment().format('YYYY-MM-DD'),
        "SalesPersonCode": user.employeeID,
        "DocumentLines": [
            {
                "c": 0,
                "ItemCode": "",
                "Quantity": 0,
                "UnitPrice": 0,
                "StgDesc": 0,
                "TaxTotal": 0,
                "Total": 0,
                "Group": "",
                "Group2": "",
                "Group3": "",
                "Group4": "",
                "Group5": "",
                "Group6": "",
                "Group7": "",
                "Group8": "",
                "TotalDis": 0
            }
        ]
    })

    useEffect(() => {

        const GETITEMSQUERYF = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=select * from ${DB_NAME}.EL_ItemMaster_B1SLQuery where "CustomerCode"= '${formData.CardCode}'  AND "ItmsGrpCod"= '102' LIMIT 50 OFFSET 0`;

        const fetchData = () => {
            axios
                .get(GETITEMSQUERYF)
                .then(response => {
                    const dataArray = JSON.parse(response.data)

                    const newObj = dataArray.map((e, i) => {
                        var column = { ...e, "id": i }

                        return column;
                    })

                    setItemDataObj(newObj)
                })
                .catch(error => console.log(error))
        }
        fetchData();

    }, [formData.CardCode, formData.GroupNumber]);

    const handleOnChange = (e, index) => {
        const { name, value } = e.target;

        const updatedDocumentLines = formData.DocumentLines.map((line, i) => {

            if (i === index && line[name] !== undefined) {

                return { ...line, [name]: value };
            }

            return line;
        });

        setFormData({ ...formData, DocumentLines: updatedDocumentLines });
        handleOnUpdate(updatedDocumentLines)
    };

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

                    const { DocumentLines, SalesPersonCode, BPL_IDAssignedToInvoice, DocDueDate, Comments, CardCode, DocDate } = data;

                    const newData = DocumentLines.map((e, i) => {

                        return { "data": [] };
                    });

                    setIteamData(newData);

                    const newObj = {

                        "CardCode": CardCode,
                        "Comments": Comments,
                        "DocDate": moment(DocDate).format('YYYY-MM-DD'),
                        "DocDueDate": moment(DocDueDate).format('YYYY-MM-DD'),
                        "BPL_IDAssignedToInvoice": BPL_IDAssignedToInvoice,
                        "SalesPersonCode": SalesPersonCode,
                        "DocumentLines": DocumentLines
                    }
                    handleOnUpdate(DocumentLines)
                    setFormData({ ...newObj })
                    CardCode ? getCustomerDetails(CardCode) : null
                    setRunOnes(true)
                })
                .catch(error => console.error('SAP API request failed:', error))
        }
        if (id) {
            getfetchData()
        }
    }, [id])

    const handleOnClear = () => {
        setFormData({
            "CardCode": "",
            "Comments": " ",
            "GroupNumber": "",
            "DocDate": "",
            "DocDueDate": "",
            "BPL_IDAssignedToInvoice": null,
            "SalesPersonCode": user.employeeID,
            "DocumentLines": [
                {
                    "LineNum": 0,
                    "ItemCode": "",
                    "Quantity": 0,
                    "UnitPrice": 0,
                    "StgDesc": 0,
                    "TaxTotal": 0,
                    "Group": "",
                    "Group2": "",
                    "Group3": "",
                    "Group4": "",
                    "Group5": "",
                    "Group6": "",
                    "Group7": "",
                    "Group8": "",
                    "Total": 0,
                    "TotalDis": 0
                }
            ]
        });
    }

    const fetchData = async () => {

        fetch(CUSTOMERS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                return response.json();
            })
            .then(data => setCustomerData(JSON.parse(data)))
            .catch(error => console.error('SAP API request failed:', error))
    }

    const handleOnSubmitUpdate = () => {

        const Update = `${SAP_BASE_URL}/Orders(${id})`;

        // const newDocumentLines = formData.DocumentLines.map(({ TotalDis, Total, Group, Group2, Group3, Group4, Group5, Group6, Group7, Group8, Group9, data, ItemData, TaxTotal, ...rest }) => rest);

        const newDocumentLines = formData.DocumentLines.map(({ LineNum, ItemCode, Quantity, UnitPrice, StgDesc, ...rest }) => ({ LineNum, ItemCode, Quantity, UnitPrice, StgDesc }));
        const UpdatedData = { ...formData, DocumentLines: newDocumentLines }

        const UpdatedDataObj = {
            "Comments": UpdatedData.Comments,
            "DocDate": UpdatedData.DocDate,
            "BPL_IDAssignedToInvoice": UpdatedData.BPL_IDAssignedToInvoice,
            "SalesPersonCode": UpdatedData.SalesPersonCode,
            "DocumentLines": UpdatedData.DocumentLines
        }

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': 'Basic ' + CREDENTIALS,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UpdatedDataObj),
            redirect: 'follow'
        };

        fetch(Update, requestOptions)
            .then(response => {
                handleOnClear()
                toast.success("Successful");
            })
            .then(() => router.push("/sales/sales-order"))
            .catch(error => {
                toast.error("Network")
                console.error('SAP API request failed:', error)
            });
    }

    // Add Row Function
    const handleAddRow = () => {

        const data = { "data": [] }
        setIteamData([...itemData, data])

        const newDocumentLine = {
            "LineNum": 0,
            "ItemCode": "",
            "Quantity": 0,
            "UnitPrice": 0,
            "StgDesc": 0,
            "TaxTotal": 0,
            "Total": 0,
            "Group": "",
            "Group2": "",
            "Group3": "",
            "Group4": "",
            "Group5": "",
            "Group6": "",
            "Group7": "",
            "Group8": "",
            "TotalDis": 0
        };
        setFormData({
            ...formData, DocumentLines: [...formData.DocumentLines, newDocumentLine],
        });
    };

    // Delete Row Function
    const handleDeleteRow = (index) => {
        const updatedDocumentLines = [...formData.DocumentLines];
        updatedDocumentLines.splice(index, 1);
        setFormData({ ...formData, DocumentLines: updatedDocumentLines, });
        handleOnUpdate(updatedDocumentLines)
    };

    useEffect(() => {
        if (moment(formData.DocDate, 'YYYY-MM-DD', true).isValid()) {

            const nextMonthDate = moment(formData.DocDate, 'YYYY-MM-DD').add(1, 'month').format('YYYY-MM-DD');
            setFormData({ ...formData, "DocDueDate": nextMonthDate })
        } else {
            setFormData({ ...formData, "DocDueDate": '' })
        }
    }, [formData.DocDate])

    const handleOnUpdate = (DocumentLines) => {

        const ArrayObj = DocumentLines

        const valid = ArrayObj[0]

        if (valid.ItemCode) {
            const newObj = ArrayObj.map((e, i) => {
                if (e.ItemCode) {
                    const quantity = Number(e.Quantity || 0)
                    const unitPrice = Number(e.UnitPrice || 0)
                    const discount = e.StgDesc ? (Number(e.StgDesc) / 100) : null
                    const texCode = e.TaxTotal ? (Number(e.TaxTotal) / 100) : null

                    var total = 0;
                    var afterDis = 0;
                    var totalTax = 0;

                    if (discount) {

                        afterDis = unitPrice * discount;

                        const finalPrice = unitPrice - afterDis;

                        total = quantity * finalPrice

                        totalTax = total * texCode

                        total = total + totalTax

                    } else {
                        total = (quantity * unitPrice)

                        totalTax = total * texCode

                        total = total + totalTax
                    }

                    const data = { ...e, "Total": total.toFixed(2), "TotalDis": afterDis * quantity, "TotalTaxAmount": totalTax };

                    return data;
                }

                return e;

            })

            setFormData({ ...formData, DocumentLines: newObj })

            const totalBeforeDiscount = newObj.reduce((acc, cur) => acc + cur.Quantity * cur.UnitPrice, 0);
            const discount = newObj.reduce((acc, cur) => acc + cur.TotalDis, 0)
            const tax = newObj.reduce((acc, cur) => acc + cur.TotalTaxAmount, 0) || 0.00;
            const total = totalBeforeDiscount - discount + tax || 0.00;

            setTotalCount({
                "Total_Before_Discount": totalBeforeDiscount.toFixed(2),
                "Discount": discount.toFixed(2),
                "Rounding": 0.00,
                "Tax": tax.toFixed(2),
                "Total": total.toFixed(2)
            });
        }
    }

    const fetchFilteredOptions = async (inputValue) => {

        setCustomerData([])

        const FILTERQUERY = `select * from ${DB_NAME}.EL_BPMaster_B1SLQuery where "CardName" like '${inputValue.toUpperCase()}%' AND "CardType"='C';`

        fetch(`${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=${FILTERQUERY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                return response.json();
            })
            .then(data => {

                const dataArray = JSON.parse(data)

                const newObj = dataArray.map((e, i) => {
                    var column = { ...e, "id": i }

                    return column;
                })
                setCustomerData(dataArray)
            })
            .catch(error => console.error('SAP API request failed:', error))
    };

    const getCustomerDetails = (CardCode) => {

        if (CardCode) {

            setShipTo([])

            const Query = `${SAP_BASE_URL}/BusinessPartners()?$select=CardCode, Phone1, CardName, EmailAddress, BPAddresses&$filter=CardCode eq '${CardCode}'`;

            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + CREDENTIALS,
                    'Content-Type': 'application/json'
                }
            }

            fetch(Query, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }

                    return response.json();
                })
                .then(data => {
                    const address = data.value;
                    const addressObj = address[0] && address[0].BPAddresses[0] ? address[0].BPAddresses : [];
                    const newObj = addressObj?.filter((e) => e.AddressType === "bo_ShipTo")
                    setShipTo(newObj)
                    console.log(newObj[0])
                    setCustomerDetails(data.value)
                })
                .catch(error => console.error('SAP API request failed:', error))
        }
    }

    useEffect(() => { fetchData() }, [])
    useEffect(() => { }, [itemData, totalCount, itemDataObj, customerData]);


    const fetchFilteredItems = async (inputValue, Code, GroupName, GroupObj) => {

        const { Group, Group2, Group3, Group4, Group5, Group6, Group7, Group8 } = GroupObj

        if (GroupName === "Group" || Group) {
            const GROUP = `"U_CRM_SGL" ='${GroupName === "Group" ? Code : Group}'`
            const GROUPTWO = GroupName === "Group2" || Group2 ? `AND  "U_CRM_SGL2" ='${GroupName === "Group2" ? Code : Group2}'` : ""
            const GROUPTHREE = GroupName === "Group3" || Group3 ? `AND  "U_CRM_SGL3" ='${GroupName === "Group3" ? Code : Group3}'` : ""
            const GROUPFOUR = GroupName === "Group4" || Group4 ? `AND  "U_CRM_SGL4" ='${GroupName === "Group4" ? Code : Group4}'` : ""
            const GROUPFIVE = GroupName === "Group5" || Group5 ? `AND  "U_CRM_SGL5" ='${GroupName === "Group5" ? Code : Group5}'` : ""
            const GROUPSIX = GroupName === "Group6" || Group6 ? `AND  "U_CRM_SGL6" ='${GroupName === "Group6" ? Code : Group6}'` : ""
            const GROUPSEVEN = GroupName === "Group7" || Group7 ? `AND  "U_CRM_SGL7" ='${GroupName === "Group7" ? Code : Group7}'` : ""
            const GROUPEIGHT = GroupName === "Group8" || Group8 ? `AND  "U_CRM_SGL8" ='${GroupName === "Group8" ? Code : Group8}'` : ""

            const QUERY = `Select * from "${DB_NAME}"."VIEW_FGItemMasterList" Where  ${GROUP} ${GROUPTWO} ${GROUPTHREE} ${GROUPFOUR}${GROUPFIVE} ${GROUPSIX} ${GROUPSEVEN} ${GROUPEIGHT}`

            const FILTERITEMS = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=${QUERY}`;

            try {
                const response = await fetch(FILTERITEMS);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const dataArray = JSON.parse(data);

                return dataArray.map((e, i) => ({ ...e, id: i }));
            } catch (error) {

                console.error('SAP API request failed:', error);

                return [];
            }
        } else {
            <Button sx={{ mb: 8 }} variant='contained' onClick={() => toast('Group 1 is Requierd', { icon: '🛈' })}>
                Emoji
            </Button>
        }
    };

    const handleOnUpdateFilterObject = (index, ValueName, Value, getItem) => {
        const updatedDocumentLines = [...formData.DocumentLines];
        updatedDocumentLines[index][ValueName] = Value;
        updatedDocumentLines[index].data = getItem;
        updatedDocumentLines[index].ItemCode = null;
        updatedDocumentLines[index].UnitPrice = null;
        updatedDocumentLines[index].LineNum = index;
        updatedDocumentLines[index].TaxTotal = null;
        updatedDocumentLines[index].Quantity = null;
        setFormData({ ...formData, DocumentLines: updatedDocumentLines });
    }


    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} >
                    <Card>
                        <Grid sx={{ borderRadius: "6px", "boxShadow": "0px 2px 6px 0px rgba(47, 43, 61, 0.14)", p: 4 }}>
                            <form onSubmit={e => e.preventDefault()}>
                                <CardContent>
                                    <Grid xs={12} sx={{ display: "flex", flex: "wrap", pb: 10 }}>
                                        <img src="/sturlite.jpeg" width={50} alt="MBM.india.pvt.Ltd" />
                                        {/* <HeaderTitle variant='h4' sx={{ ml: 4 }} >
                                            {themeConfig.templateName}
                                        </HeaderTitle> */}
                                    </Grid>

                                    <Grid container spacing={5} xs={12}>
                                        <Grid item xs={12} md={6} >
                                            <CustomCustomer
                                                disabled={true}
                                                labelName={"Customer"}
                                                partnerType={"C"}
                                                cardValue={formData.CardCode}
                                                onChangeInputFunction={() => {
                                                    setFormData({ ...formData, "CardCode": null })
                                                    setShipTo([])
                                                    setShipData()
                                                }}

                                                onChangeFunction={(event, newValue) => {

                                                    setShipTo([])

                                                    setShipData()

                                                    const DocumentLines = [
                                                        {
                                                            "LineNum": 0,
                                                            "ItemCode": "",
                                                            "Quantity": null,
                                                            "UnitPrice": null,
                                                            "StgDesc": null,
                                                            "TaxTotal": null,
                                                            "Group": "",
                                                            "Group2": "",
                                                            "Group3": "",
                                                            "Group4": "",
                                                            "Group5": "",
                                                            "Group6": "",
                                                            "Group7": "",
                                                            "Group8": "",
                                                            "Total": null,
                                                            "TotalDis": null
                                                        }
                                                    ]
                                                    setFormData({ ...formData, "DocumentLines": DocumentLines, "CardCode": newValue?.CardCode || "" })

                                                    setTotalCount({
                                                        "Total_Before_Discount": 0.00,
                                                        "Discount": 0.00,
                                                        "Rounding": 0.00,
                                                        "Tax": 0.00,
                                                        "Total": 0.00
                                                    })

                                                    getCustomerDetails(newValue?.CardCode)

                                                    handleOnUpdate(DocumentLines)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Grid container spacing={5} xs={12}>
                                                <Grid item xs={6} >
                                                    <CustomTextField
                                                        fullWidth
                                                        type="date"
                                                        label="Posting Date"
                                                        name="DocDate"
                                                        value={formData.DocDate}
                                                        onChange={(e) => setFormData({ ...formData, "DocDate": e.target.value })}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <CustomTextField
                                                        fullWidth
                                                        type="date"
                                                        name="DocDueDate"
                                                        value={formData.DocDueDate}
                                                        label="Due Date"
                                                        onChange={(e) => setFormData({ ...formData, "DocDueDate": e.target.value })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={5} xs={12} sx={{ mt: 2 }}>

                                        <Grid item xs={12} md={6} >
                                            <Autocomplete
                                                fullWidth
                                                Autocomplete="off"
                                                options={shipTo}
                                                getOptionLabel={(option) => option.AddressName}
                                                value={shipTo.find((customer) => customer.AddressName === shipToValue) || null}
                                                onInputChange={async (event, newInputValue) => {
                                                    setShipData()
                                                }}
                                                onChange={(event, newValue) => {
                                                    setShipToValue(newValue?.AddressName)
                                                    const data = shipTo.find((e) => e.AddressName === newValue?.AddressName) || []
                                                    setShipData(data)
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField
                                                        {...params}
                                                        label="Ship To"
                                                    />
                                                )}
                                            />
                                            <Box sx={{ p: 4 }}>
                                                {customerDetails[0] && shipData ?
                                                    <>
                                                        <Grid xs={12}>
                                                            <Grid>{shipData && shipData.AddressName}</Grid>
                                                        </Grid>
                                                        <Grid xs={12}>
                                                            <Grid>
                                                                {shipData && shipData.AddressName2}{" "}
                                                                {shipData && shipData.AddressName3}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid xs={12}>
                                                            <Grid>{shipData && shipData.City}</Grid>
                                                        </Grid>
                                                        <Grid xs={12}>
                                                            <Grid>  {formData.CardCode && customerDetails[0]?.Phone1}</Grid>
                                                        </Grid>
                                                        <Grid xs={12} >
                                                            <Grid>  {formData.CardCode && customerDetails[0]?.EmailAddress}</Grid>
                                                        </Grid>
                                                        <Grid xs={12}>
                                                            <Grid>
                                                                {shipData && shipData.GSTIN ? "GSTIN : " : null} {shipData && shipData.GSTIN}
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                    : null}
                                            </Box>
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={5} sx={{ display: "flex", justifyContent: "end" }}>

                                        <Grid item xs={12} style={{ margin: "15px 0px" }}>
                                            Item Selection
                                        </Grid>
                                        {formData.DocumentLines.map((e, i) => {

                                            const FilterItem = e.data ? e.data : []

                                            return (
                                                <Card sx={{ pl: 5, pb: 4, mb: 3 }} key={i} style={{ width: "100%", boxShadow: "none", border: "1px solid #e8e8e8" }}>
                                                    <Grid sx={{ display: "flex", justifyContent: "end", mb: -6 }}>
                                                        <Box>
                                                            <Button size="small" onClick={() => handleDeleteRow(i)} disabled={formData.DocumentLines[1] ? false : true}>
                                                                <Icon icon='material-symbols:close' />
                                                            </Button>
                                                        </Box>
                                                    </Grid>

                                                    <Grid container sx={{ display: 'flex', flexWrap: 'wrap' }} spacing={1} xs={12}>

                                                        {/* <Grid container xs={12} sx={{ p: 1 }} spacing={3}>
                                                            {GroupFilterObj.map((filterValue, filterIndex) => {
                                                                const { Group, GroupName, label } = filterValue

                                                                return (
                                                                    <Grid item xs={6} md={3} key={filterIndex}>
                                                                        <CustomeItemGroupFilter
                                                                            lable={label}
                                                                            Group={Group}
                                                                            disabled={formData.CardCode ? false : true}
                                                                            value={formData.DocumentLines[i][GroupName]}
                                                                            onChangeFunction={async (event, newValue) => {
                                                                                console.log(formData.DocumentLines[i])
                                                                                const getItem = await fetchFilteredItems(null, newValue?.CODE, GroupName, formData.DocumentLines[i]);
                                                                                handleOnUpdateFilterObject(i, GroupName, newValue?.CODE, getItem)
                                                                            }}
                                                                        />
                                                                    </Grid>)
                                                            })}
                                                        </Grid> */}

                                                        <Grid item xs={12} sm={6} lg={5} xl={6}>

                                                            <CustomTextField
                                                                fullWidth
                                                                disabled={true}
                                                                value={formData?.DocumentLines[i]?.ItemDescription}
                                                                size="small"
                                                                label="Item No."
                                                            />

                                                            {/* <Autocomplete
                                                                disabled={formData.CardCode ? false : true}
                                                                fullWidth
                                                                autoComplete="off"
                                                                options={FilterItem}
                                                                getOptionLabel={(option) => option.ItemName}
                                                                value={FilterItem.find((item) => item.ItemCode === formData.DocumentLines[i].ItemCode) || null}
                                                                onChange={(event, newValue) => {
                                                                    const getItem = newValue;
                                                                    const updatedDocumentLines = [...formData.DocumentLines];

                                                                    updatedDocumentLines[i] = {
                                                                        ...updatedDocumentLines[i],
                                                                        ItemCode: getItem?.ItemCode || 0,
                                                                        UnitPrice: getItem?.Price || 0,
                                                                        LineNum: i,
                                                                        TaxTotal: Number(getItem?.TaxRate || 0),
                                                                        Quantity: 1,
                                                                    };

                                                                    setFormData({ ...formData, DocumentLines: updatedDocumentLines });
                                                                    handleOnUpdate(updatedDocumentLines);
                                                                }}

                                                                // onInputChange={async (event, newInputValue) => {

                                                                //     const updatedDocumentLines = [...formData.DocumentLines]
                                                                //     updatedDocumentLines[i] = { ...updatedDocumentLines[i], "ItemCode": null }
                                                                //     setFormData({ ...formData, DocumentLines: updatedDocumentLines });

                                                                //     if (newInputValue.length >= 1) {

                                                                //         var Group1 = formData.DocumentLines[i].Group1;
                                                                //         var Group4 = formData.DocumentLines[i].Group4;
                                                                //         var Group5 = formData.DocumentLines[i].Group5;

                                                                //         const getItem = await fetchFilteredItems(newInputValue, Group1, Group4, Group5);

                                                                //         const updatedDocumentLines = [...itemData];
                                                                //         updatedDocumentLines[i] = { "data": getItem };
                                                                //         setIteamData(updatedDocumentLines)
                                                                //     }
                                                                // }}

                                                                renderInput={(params) => (
                                                                    <CustomTextField
                                                                        {...params}
                                                                        size="small"
                                                                        label="Item No."
                                                                    />
                                                                )}

                                                                renderOption={(props, option) => (
                                                                    <li {...props}>
                                                                        <Grid spacing={1} >
                                                                            <Grid xs={12} sx={{ fontSize: "12px" }}>
                                                                                {option.ItemName}
                                                                            </Grid>
                                                                            <Grid xs={12} sx={{ opacity: "50%", fontSize: "10px" }}>
                                                                                {option.ItemCode}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </li>
                                                                )}
                                                                loadingText="Loading..."
                                                                noOptionsText="No items found"
                                                                loading={!itemData[0]}
                                                            /> */}
                                                        </Grid>
                                                        <Grid item style={{ width: "120px" }}>
                                                            <CustomTextField
                                                                disabled={true}
                                                                type="number"
                                                                Autocomplete="off"
                                                                name="Quantity"
                                                                label="WareHouse"
                                                            />
                                                        </Grid>
                                                        <Grid item style={{ width: "100px" }}>
                                                            <CustomTextField
                                                                disabled={formData.CardCode ? false : true}
                                                                type="number"
                                                                Autocomplete="off"
                                                                name="Quantity"
                                                                label="Quantity"
                                                                value={formData.DocumentLines[i].Quantity || null}
                                                                onChange={(e) => handleOnChange(e, i)}
                                                            />
                                                        </Grid>
                                                        <Grid item style={{ width: "100px" }}>
                                                            <CustomTextField
                                                                disabled={formData.CardCode ? false : true}
                                                                type="number"
                                                                Autocomplete="off"
                                                                name="UnitPrice"
                                                                label="Unit Price"
                                                                value={formData.DocumentLines[i].UnitPrice || null}
                                                                onChange={(e) => handleOnChange(e, i)}
                                                            />
                                                        </Grid>
                                                        <Grid item style={{ width: "100px" }}>
                                                            <CustomTextField
                                                                disabled={formData.CardCode ? false : true}
                                                                type="number"
                                                                Autocomplete="off"
                                                                name="StgDesc"
                                                                label="Discount %"
                                                                value={formData.DocumentLines[i].StgDesc || null}
                                                                onChange={(e) => handleOnChange(e, i)}
                                                            />
                                                        </Grid>
                                                        <Grid item style={{ width: "100px" }}>
                                                            <CustomTextField
                                                                disabled
                                                                Autocomplete="off"
                                                                type="number"
                                                                name="TaxTotal"
                                                                label="Tax Rate"
                                                                value={formData.DocumentLines[i].TaxTotal || null}
                                                                onChange={(e) => handleOnChange(e, i)}
                                                            />
                                                        </Grid>
                                                        <Grid item style={{ width: "100px" }}>
                                                            <CustomTextField
                                                                disabled
                                                                Autocomplete="off"
                                                                type="number"
                                                                name="Total"
                                                                label="Total"
                                                                value={formData.DocumentLines[i].Total > 0 ? formData.DocumentLines[i].Total : 0}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            )
                                        })}
                                    </Grid>
                                    <Grid sx={{ py: 2, display: "flex", justifyContent: "end", width: "100%" }}>
                                        <Button variant='contained' onClick={() => handleAddRow()} size="small" disabled={formData.CardCode ? false : true}>
                                            <Icon icon='tabler:plus' />  Add Row
                                        </Button>
                                    </Grid>
                                    <Grid container sx={{ marginTop: "30px", display: 'flex', flexWrap: 'wrap', justifyContent: "space-between" }}>
                                        <Grid item xs={12} sm={5} >
                                            <Grid item xs={8} sx={{ mb: 5 }}>
                                                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                                    <Typography sx={{ width: '110px', color: 'text.secondary' }}>
                                                        Sales Person:
                                                    </Typography>
                                                </Box>
                                                <CustomTextField
                                                    disabled
                                                    Autocomplete="off"
                                                    fullWidth
                                                    type="text"
                                                    name="Sales Person"
                                                    value={user.username}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                                    <Typography sx={{ width: '110px', color: 'text.secondary' }}>
                                                        Remarks:
                                                    </Typography>
                                                </Box>
                                                <CustomTextField
                                                    rows={4}
                                                    multiline
                                                    Autocomplete="off"
                                                    fullWidth
                                                    type="text"
                                                    name="Comments"
                                                    value={formData.Comments}
                                                    onChange={(e) => setFormData({ ...formData, "Comments": e.target.value })}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={6} sx={{ mt: 4 }} >
                                            <Card sx={{ px: 6, py: 8, boxShadow: "none", border: "1px solid #e8e8e8" }} >
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                                                    className='demo-space-x'>
                                                    <div>Total Before Discount</div>
                                                    <div>{totalCount.Total_Before_Discount}</div>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                                                    className='demo-space-x'>
                                                    <div>Discount</div>
                                                    <div>{totalCount.Discount} </div>
                                                </Box>

                                                {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                                                className='demo-space-x' >
                                                <div>Rounding</div>
                                                <div>{totalCount.Rounding}</div>
                                            </Box> */}
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                                                    className='demo-space-x' >
                                                    <div>Tax</div>
                                                    <div>{totalCount.Tax}</div>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                                                    className='demo-space-x'>
                                                    <div>Total </div>
                                                    <div>{totalCount.Total}</div>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </form>
                            <Grid xs={12} sx={{ p: 6, display: "flex", justifyContent: "end" }} className='demo-space-x'>
                                <Grid>
                                    <Link href='/sales/sales-order'>
                                        <Button variant='tonal' color='secondary' >
                                            Back
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid>
                                    <Button variant='contained' onClick={() => handleOnSubmitUpdate()}>
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid >
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Index
