import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import CustomTextField from 'src/@core/components/mui/text-field'

const SAP_BASE_URL = process.env.NEXT_PUBLIC_SAP_BASE_URL;

const CustomItemMaster = ({ partnerType, onChangeFunction, cardValue, onChangeInputFunction, labelName }) => {

    const [itemGroup, setItemGroup] = useState([])
    const CREDENTIALS = window.localStorage.getItem("CREDENTIALS")

    const getSearchItem = (itemGroup, ItemGroupCode, index, searchText) => {

        if (itemGroup) {
            const ITEMAPI = `${SAP_BASE_URL}/Items()?$select=ItemCode,ItemName,ItemsGroupCode,User_Text,Valid&$filter=ItemsGroupCode eq ${itemGroup}${searchText ? ` and startswith(ItemName,'${searchText.toLowerCase()}') or startswith(ItemName,'${searchText.toUpperCase()}') or startswith(ItemName,'${searchText}')` : ''} `;

            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + CREDENTIALS,
                    Prefer: 'odata.maxpagesize=100',
                    'Content-Type': 'application/json'
                }
            }

            fetch(ITEMAPI, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }

                    return response.json();
                })
                .then(data => {

                    const originalArray = data.value;

                    const updatedDocumentLines = [...salesOpportunitiesInterests]

                    var newObj = originalArray?.map((e, i) => {

                        var data = { ...e, "id": i }

                        return data
                    })

                    updatedDocumentLines[index] = {
                        ...updatedDocumentLines[index],
                        "ItemData": newObj,
                        "ItemGroupCode": itemGroup,
                    };

                    setSalesOpportunitiesInterests(updatedDocumentLines)
                })
                .catch(error => console.error('SAP API request failed:', error))
        }
    }

    useEffect(() => {
        fetchFilteredOptions("")
    }, [])

    return (
        <Autocomplete
            fullWidth
            id="#Lead"
            options={ItemData}
            getOptionLabel={(option) => option.ItemName}
            getOptionSelected={(option, value) => option.ItemCode === cardValue}
            value={e.ItemData?.find((item) => item.ItemCode === cardValue) || null}
            onInputChange={(event, newInputValue) => {
                if (event && event._reactName === "onChange" && newInputValue.length >= 1) {
                    getSearchItem(ItemGroupCode, i, newInputValue)
                }
            }}
            onChange={onChangeFunction}
            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    size="small"
                    label={labelName ? labelName : "Customer"}
                    placeholder="Type to Search"
                />
            )}
            renderOption={(props, option) => (
                <li {...props}>
                    <Grid spacing={1}>
                        <Grid xs={12} sx={{ fontSize: "12px" }}>
                            {option.ItemName}
                        </Grid>
                        <Grid xs={12} sx={{ opacity: "50%", fontSize: "10px" }}>
                            {option.ItemCode}
                        </Grid>
                    </Grid>
                </li>
            )}
            loadingText="Type to Search..."
            noOptionsText="No options found"
            loading={!itemGroup[0]}
        />
    )
}

export default CustomItemMaster


// const Demo = () => {
//     <CustomItemMaster
//         labelName={"Customer Name"}
//         partnerType={partnerType} // C -> Customer , L -> Lead
//         cardValue={cardValue} // where update
//         onChangeInputFunction={onChangeInputFunction} // make your Own OnChange Function
//         onChangeFunction={onChangeFunction} // make your Own Function when input Change
//     />
// }