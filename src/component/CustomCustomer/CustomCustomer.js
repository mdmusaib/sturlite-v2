import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import CustomTextField from 'src/@core/components/mui/text-field'

const SAP_BASE_URL = process.env.NEXT_PUBLIC_SAP_BASE_URL;

const CustomCustomer = ({ partnerType, onChangeFunction, cardValue, onChangeInputFunction, labelName }) => {

    const [customerData, setCustomerData] = useState([]);
    const CREDENTIALS = window.localStorage.getItem("CREDENTIALS")

    const fetchFilteredOptions = async (inputValue) => {
        setCustomerData([])
        const SAPURL = `${SAP_BASE_URL}/BusinessPartners()?$select=CardCode,CardName&$filter=CardType eq '${partnerType}' and startswith(CardName,'${inputValue}')&$orderby=CardCode desc &$inlinecount=allpages`

        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + CREDENTIALS,
                'Content-Type': 'application/json'
            }
        }

        fetch(SAPURL, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                return response.json();
            })
            .then(data => {

                const dataArray = data.value

                const newObj = dataArray.map((e, i) => {
                    var column = { ...e, "id": i }

                    return column;
                })
                setCustomerData(newObj)
            })
            .catch(error => console.error('SAP API request failed:', error))
    };

    useEffect(() => {
        fetchFilteredOptions("")
    }, [])

    return (
        <Autocomplete
            fullWidth
            id="#Customer"
            options={customerData}
            getOptionLabel={(e) => e.CardName}
            getOptionSelected={(option, value) => option.CardCode === value.CardCode}
            value={customerData?.find((customer) => customer.CardCode === cardValue) || null}
            onInputChange={(event, newInputValue) => {
                if (event && event._reactName === "onChange") {
                    newInputValue.length >= 1 ? fetchFilteredOptions(newInputValue) : null
                    setCustomerData([])
                    onChangeInputFunction()
                }
            }}
            onChange={onChangeFunction}

            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    label={labelName ? labelName : "Customer"}
                    size="small"
                    placeholder="Search..."
                />
            )}
            renderOption={(props, option) => (
                <li {...props}>
                    <Grid spacing={1} >
                        <Grid xs={12} sx={{ fontSize: "12px" }}>
                            {option.CardName}
                        </Grid>
                        <Grid xs={12} sx={{ opacity: "50%", fontSize: "10px" }}>
                            {option.CardCode}
                        </Grid>
                    </Grid>
                </li>
            )}
            loadingText="Type to Search..."
            noOptionsText="No options found"
            loading={!customerData[0]}
        />

    )
}

export default CustomCustomer


// const Demo = () => {
//     <CustomCustomer
//         labelName={"Customer Name"}
//         partnerType={partnerType} // C -> Customer , L -> Lead
//         cardValue={cardValue} // where update
//         onChangeInputFunction={onChangeInputFunction} // make your Own OnChange Function
//         onChangeFunction={onChangeFunction} // make your Own Function when input Change
//     />
// }