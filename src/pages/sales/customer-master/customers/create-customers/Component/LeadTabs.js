import { useState } from 'react'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import Contacts from './Contacts'
import Address from './Address'

const LeadTabs = ({ formData, setFormData, handleOnChange, addIndex, setAddIndex, addressObj, setAddressObj, contactIndex, setContactIndex, contactObj, setContactObj }) => {

    const [value, setValue] = useState('1')

    const handleChange = (e, newValue) => { setValue(newValue) }

    return (
        <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='nav tabs example'>
                <Tab value='1' component='a' label='General' href='/general' onClick={e => e.preventDefault()} />
                <Tab value='2' component='a' label='Contact Persons' href='/contacts' onClick={e => e.preventDefault()} />
                <Tab value='3' component='a' label='Addresses' href='/Addresses' onClick={e => e.preventDefault()} />
            </TabList>
            <TabPanel value='1'>
                <Grid container spacing={5} >
                    <Grid item xs={12} sx={{ px: 6 }}>
                        <Typography variant='body3' sx={{ fontWeight: 600 }}>
                            Customer Image
                        </Typography>
                        <Grid item xs={12} sm={6}>
                            <Grid item xs={12} sm={6} sx={{ p: 2, mt: 5 }}>
                                <Avatar sx={{ width: 120, height: 120, background: "#ededed" }} >
                                    <Icon style={{ fontSize: "100px", color: "#d3d3d3" }} icon='iconamoon:profile-circle-thin' />
                                </Avatar>
                                <CustomTextField
                                    sx={{ mt: -20, width: 120, display: "none" }}
                                    type='file'
                                    name='TicketsImage'
                                    label=''
                                    placeholder=''
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type='text'
                            name='CardCode'
                            label='Customer Code'
                            value={formData.CardCode}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type='text'
                            name='CardName'
                            label='Customer Name'
                            value={formData.CardName}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type='text'
                            label='Website'
                            name='Website'
                            value={formData.Website}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type='tel'
                            label='Phone'
                            name='Phone1'
                            value={formData.Phone1}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type='text'
                            label='Contact Person Name'
                            name='ContactPerson'
                            value={formData.ContactPerson}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type='tel'
                            label='Contact Person Mobile'
                            name='Phone2'
                            value={formData.Phone2}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type='text'
                            label='Address Location'
                            name='Address'
                            value={formData.Address}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type="number"
                            name='ZipCode'
                            label='Address Pincode'
                            value={formData.ZipCode}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            name='SalesPersonCode'
                            label='Sales Employee'
                            value={formData.SalesPersonCode}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type="text"
                            name='LeadSource'
                            label='Lead Source'
                            value={formData.LeadSource}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            fullWidth
                            type="text"
                            name='Industry'
                            label='Industry'
                            value={formData.Industry}
                            onChange={handleOnChange}
                        />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value='2'>
                <Contacts
                    FormData={formData}
                    FormDataFunction={setFormData}
                    contactIndex={contactIndex}
                    setContactIndex={setContactIndex}
                    contactObj={contactObj}
                    setContactObj={setContactObj}
                />
            </TabPanel>
            <TabPanel value='3'>
                <Address
                    FormData={formData}
                    FormDataFunction={setFormData}
                    addressObj={addressObj}
                    setAddressObj={setAddressObj}
                    setAddIndex={setAddIndex}
                    addIndex={addIndex}
                />
            </TabPanel>
        </TabContext >
    )
}

export default LeadTabs
