import React, { useEffect, useState } from 'react';
import CustomTextField from 'src/@core/components/mui/text-field'
import axios from 'axios';
import CustomAutocomplete from 'src/@core/components/mui/autocomplete';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DB_TYPE = process.env.NEXT_PUBLIC_DATABASE_TYPE;

const GroupFilterObj = [
    {
        Group: 1,
        GroupName: "Group",
        label: "Product Category",
    },
    {
        Group: 2,
        GroupName: "Group2",
        label: "Product Series",
    },
    {
        Group: 3,
        GroupName: "Group3",
        label: "Product Group",
    },
    {
        Group: 4,
        GroupName: "Group4",
        label: "HB/MB",
    },
    {
        Group: 5,
        GroupName: "Group5",
        label: "Semi Colour",
    },
    {
        Group: 6,
        GroupName: "Group6",
        label: "Fabric Colour",
    },
    {
        Group: 7,
        GroupName: "Group7",
        label: "Standard Product",
    },
    {
        Group: 8,
        GroupName: "Group8",
        label: "Customer Product",
    },
]


const CustomeItemGroupFilter = ({ Group, lable, value, onChangeFunction, disabled }) => {

    let APIQUERY;
    const [itemGroup, setItemGroup] = useState([])

    switch (Group) {
        case 1:
            APIQUERY = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=Select * from "MBM_TEST_DB"."VIEW_ITEMGRP1"`;
            break;
        case 2:
            APIQUERY = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=Select * from "MBM_TEST_DB"."VIEW_ITEMGRP2"`;
            break;
        case 3:
            APIQUERY = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=Select * from "MBM_TEST_DB"."VIEW_CRM_SGL"`;
            break;
        case 4:
            APIQUERY = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=Select * from "MBM_TEST_DB"."VIEW_ITEMGRP4"`;
            break;
        case 5:
            APIQUERY = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=Select * from "MBM_TEST_DB"."VIEW_ITEMGRP5"`;
            break;
        case 6:
            APIQUERY = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=Select * from "MBM_TEST_DB"."VIEW_ITEMGRP6"`;
            break;
        case 7:
            APIQUERY = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=Select * from "MBM_TEST_DB"."VIEW_ITEMGRP7"`;
            break;
        case 8:
            APIQUERY = `${BASE_URL}/Query/ExecuteQuery?dbtype=${DB_TYPE}&query=Select * from "MBM_TEST_DB"."VIEW_ITEMGRP8"`;
            break;
        default:
            APIQUERY = '';
    }


    const fetchData = () => {

        axios.get(APIQUERY)
            .then(response => {
                const dataArray = JSON.parse(response.data)

                const newObj = dataArray.map((e, i) => {

                    var column = { ...e, id: i + 1 };

                    return column;
                })
                setItemGroup(newObj)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => { fetchData() }, [])

    return (
        <CustomAutocomplete
            disabled={disabled}
            key={Group}
            options={itemGroup}
            onChange={onChangeFunction}
            getOptionLabel={option => option.CODE || ''}
            value={itemGroup.find((customer) => customer.GROUP1 === value) || null}
            renderInput={params => <CustomTextField {...params} label={lable} />}
        />
    )
}

export { CustomeItemGroupFilter, GroupFilterObj }
