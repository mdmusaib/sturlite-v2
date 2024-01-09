import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from 'src/@core/components/mui/text-field'

const Address = ({ FormDataFunction, FormData, addIndex, setAddIndex, addressObj, setAddressObj }) => {

    const handleOnAdd = () => {

        if (addressObj[addIndex].AddressName) {

            const newObj = {
                "key": addressObj[addIndex].key + 1,
                "AddressType": "bo_BillTo",
                "AddressName": "Bill To",
                'Country': null,
                'ZipCode': null,
                'City': null,
                'State': null,
                'BuildingFloorRoom': null,
                'GstType': null,
                'GSTIN': null,
            }
            const updatedObject = [...addressObj, newObj]
            setAddressObj(updatedObject)
            setAddIndex(addressObj.length)
        }
    }
    useEffect(() => {

        const addLength = addressObj.length

        addressObj[addLength] ? setAddIndex(addLength) : null

    }, [addIndex])

    const handleOnDelete = (i) => {

        const deleteRow = (arr, row) => {

            arr.splice(row, 1);

            return arr;
        }

        const list = [...addressObj];
        deleteRow(list, i);
        setAddressObj(list);
        setAddIndex(0)
    }

    const handleOnUpdateChange = () => {

        FormDataFunction({
            ...FormData,
            "BPAddresses": addressObj
        })

    }

    const handleOnChange = (e, i) => {

        const { name, value } = e.target;

        const list = [...addressObj];

        list[i][name] = value;

        setAddressObj(list);

        handleOnUpdateChange()

    }


    return (
        <Grid container spacing={5} xs={12}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", mb: 5, px: 5 }}>
                <Button variant='contained' onClick={() => handleOnAdd()} size='small'>Add +</Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ px: 12, }}>
                <Grid xs={12} sx={{ mt: -7 }} >
                    <Box sx={{ px: 2, fontSize: "16px", fontWeight: "600" }}>
                        Bill To
                    </Box>
                </Grid>
                <Grid xs={12}
                    spacing={0}
                    sx={{ boxShadow: "none", border: "1px solid #e8e8e8", height: "200px", p: 2, overflowY: "scroll", borderRadius: "5px" }}
                >
                    {addressObj.map((e, i) => <>
                        {addressObj[i].AddressName && e.AddressType === "bo_BillTo" ? <Button
                            variant={i === addIndex ? 'contained' : "text"}
                            sx={{ width: "100%", }}
                            onClick={() => setAddIndex(i)}
                            size='small'>
                            {e.AddressName}
                        </Button> :
                            <></>
                        }
                    </>)}
                </Grid>
                <Grid xs={12} sx={{ my: 6, }} >
                    <Box sx={{ my: 6, px: 2, fontSize: "16px", fontWeight: "600" }}>
                        Ship To
                    </Box>
                </Grid>
                <Grid xs={12}
                    spacing={0}
                    sx={{ boxShadow: "none", border: "1px solid #e8e8e8", height: "200px", mt: -6, p: 2, overflowY: "scroll", borderRadius: "5px" }}
                >
                    {addressObj.map((e, i) => <>
                        {addressObj[i].AddressName && e.AddressType === "bo_ShipTo" ? <Button
                            variant={i === addIndex ? 'contained' : "text"}
                            sx={{ width: "100%", }}
                            onClick={() => setAddIndex(i)}
                            size='small'>
                            {e.AddressName}
                        </Button> :
                            <></>
                        }
                    </>)}
                </Grid >
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", mt: 6 }}>
                    <Button
                        disabled={addressObj.length > 1 ? false : true}
                        variant='tonal'
                        size='small'
                        onClick={() => handleOnDelete(addIndex)}>
                        Delete Address
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={5} xs={12} sm={6} key={addressObj[addIndex].key}>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        select
                        id='custom-select'
                        label='Address Type'
                        placeholder=''
                        name='AddressType'
                        value={addressObj[addIndex].AddressType}
                        onChange={(e) => handleOnChange(e, addIndex)}>
                        <MenuItem value="bo_ShipTo">Ship To</MenuItem>
                        <MenuItem value="bo_BillTo">Bill To</MenuItem>
                    </CustomTextField>
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Address ID'
                        placeholder=''
                        name='AddressName'
                        value={addressObj[addIndex].AddressName}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Country'
                        placeholder=''
                        name='Country'
                        value={addressObj[addIndex].Country}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Pin Code'
                        placeholder=''
                        name='ZipCode'
                        value={addressObj[addIndex].ZipCode}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='City'
                        placeholder=''
                        name="City"
                        value={addressObj[addIndex].City}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='State'
                        placeholder=''
                        name="State"
                        value={addressObj[addIndex].State}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />
                </Grid>
                {/* <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Street Name'
                        placeholder=''
                        name="Street"
                        value={addressObj[addIndex].Street}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />
                </Grid> */}
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='BuildingFloorRoom / Floor'
                        placeholder=''
                        name="BuildingFloorRoom"
                        value={addressObj[addIndex].BuildingFloorRoom}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='GST Type'
                        placeholder=''
                        name='GstType'
                        value={addressObj[addIndex].GstType}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />

                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='GST ID'
                        placeholder=''
                        name="GSTIN"
                        value={addressObj[addIndex].GSTIN}
                        onChange={(e) => handleOnChange(e, addIndex)}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Address

