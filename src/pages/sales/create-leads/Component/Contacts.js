import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from 'src/@core/components/mui/text-field'

const Contacts = ({ FormDataFunction, FormData, contactIndex, setContactIndex, contactObj, setContactObj }) => {

    const handleOnAdd = () => {
        if (contactObj[contactIndex].Address) {
            const newObj = {
                "key": contactObj[contactIndex].key + 1,
                "CardCode": null,
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
            }

            setContactObj([...contactObj, newObj])

            setContactIndex(contactObj.length)
        }
    }


    const handleOnDelete = (i) => {

        const deleteRow = (arr, row) => {

            arr.splice(row, 1);

            return arr;
        }

        const list = [...contactObj];
        deleteRow(list, i);
        setContactObj(list);
        setContactIndex(0)
    }


    const handleOnUpdateChange = () => {
        const newObject = contactObj.map(({ key, ...rest }) => {
            return {
                ...rest,
                "CardCode": FormData.CardCode ? FormData.CardCode : null
            }
        });
        FormDataFunction({
            ...FormData,
            "ContactEmployees": newObject
        })
    }

    const handleOnChange = (e, i) => {

        const { name, value } = e.target;

        const list = [...contactObj];

        list[i][name] = value;

        setContactObj(list);
        handleOnUpdateChange()
    }

    return (
        <Grid container spacing={5} xs={12}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", mb: 5, px: 5 }}>
                <Button variant='contained' onClick={() => handleOnAdd()} size='small'>Add +</Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ px: 12, }}>
                <Grid xs={12} sx={{ mt: -8, }} >
                    <Box sx={{ px: 2, fontSize: "16px", fontWeight: "600" }}>
                        Contact ID
                    </Box>
                </Grid>
                <Grid xs={12}
                    spacing={0}
                    sx={{ boxShadow: "none", border: "1px solid #e8e8e8", mb: 6, height: "300px", p: 2, overflowY: "scroll", borderRadius: "5px" }}
                >
                    {contactObj.map((e, i) => <>
                        {contactObj[i].Address ? <Button
                            variant={i === contactIndex ? 'contained' : "text"}
                            sx={{ width: "100%", }}
                            onClick={() => setContactIndex(i)}
                            size='small'>
                            {e.Address}
                        </Button> :
                            <></>
                        }
                    </>)}
                </Grid >
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", mt: 6 }}>
                    <Button
                        disabled={contactObj.length > 1 ? false : true}
                        variant='tonal'
                        size='small'
                        onClick={() => handleOnDelete(contactIndex)}>
                        Delete Contacts
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={5} xs={12} sm={6} key={contactObj[contactIndex].key}>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth type='text'
                        label='Address ID'
                        placeholder=''
                        name='Address'
                        value={contactObj[contactIndex].Address}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid>
                {/* <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Contact ID'
                        placeholder=''
                        name='Street'
                        value={contactObj[contactIndex].Street}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid> */}
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='First Name'
                        placeholder=''
                        name='FirstName'
                        value={contactObj[contactIndex].FirstName}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Last Name'
                        placeholder=''
                        name='LastName'
                        value={contactObj[contactIndex].LastName}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Mobile Number'
                        placeholder=''
                        name='MobilePhone'
                        value={contactObj[contactIndex].MobilePhone}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Phone 2'
                        placeholder=''
                        name="Phone2"
                        value={contactObj[contactIndex].Phone2}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='email'
                        label='Email'
                        placeholder=''
                        name="Email"
                        value={contactObj[contactIndex].Email}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid>
                {/* <Grid item xs={12} >
                    <CustomTextField
                        fullWidth
                        type='text'
                        label='Position'
                        placeholder=''
                        name="Position"
                        value={contactObj[contactIndex].Position}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid> */}
                <Grid item xs={12} >
                    <CustomTextField
                        select
                        fullWidth
                        id='custom-select'
                        label='Gender'
                        name='Gender'
                        value={contactObj[contactIndex].Gender}
                        onChange={(e) => handleOnChange(e, contactIndex)}>
                        <MenuItem value="gt_Male">Male</MenuItem>
                        <MenuItem value="gt_Female">Female</MenuItem>
                        <MenuItem value="gt_Undefined">Trans</MenuItem>
                    </CustomTextField>
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField
                        rows={4}
                        multiline
                        fullWidth type='text'
                        label='Remarks'
                        placeholder=''
                        name="Remarks1"
                        value={contactObj[contactIndex].Remarks1}
                        onChange={(e) => handleOnChange(e, contactIndex)}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Contacts

