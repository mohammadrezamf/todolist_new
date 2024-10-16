import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

type Props = {
    searchBaseType: (value: string) => void
}

const SearchBaseSelectBox = (props: Props) => {
    const [searchBase, setSearchBase] = React.useState('title');

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string
        setSearchBase(value);
        props.searchBaseType(value)
    };


    return (
        <FormControl sx={{m: 1, minWidth: 120}}>
            <InputLabel id="demo-simple-select-label">search base</InputLabel>
            <Select
                fullWidth
                variant='outlined'
                size='small'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchBase}
                label={searchBase}
                onChange={handleChange}
                sx={{backgroundColor: "#fce4ec"}}
            >
                {['title', 'time', 'status', 'severity'].map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SearchBaseSelectBox;