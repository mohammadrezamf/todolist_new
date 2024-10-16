'use client';

import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Drawer, Stack, TextField, Typography} from '@mui/material';
import ToDoForm from '@/app/components/ToDoForm';
import {FormTypes} from '@/app/components/index.types';
import ToDoCard from '@/app/components/ToDoCard';
import SearchBaseSelectBox from '@/app/components/SearchBaseSelectBox';
import useFilterByField from '@/app/components/index.hooks';
import NoData from '@/app/components/NoData';

export default function ToDoCardList() {
    const [fakeData, setFakeData] = useState<FormTypes[]>([]);
    const [filteredData, setFilteredData] = useState<FormTypes[]>([]);
    const [selectedItem, setSelectedItem] = useState<FormTypes | undefined>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBaseType, setSearchBaseType] = useState('title');
    const filterByField = useFilterByField(searchTerm);

    const fetchToDoList = () => {
        const savedData = localStorage.getItem('toDoList');
        return savedData ? JSON.parse(savedData) : [];
    };

    const prefetch = () => {
        const data = fetchToDoList();
        setFakeData(data);
        setFilteredData(data); // Initialize filtered data
    };

    const openForm = (item?: FormTypes) => {
        setSelectedItem(item);
        setIsDrawerOpen(true);
    };

    const closeForm = () => {
        setIsDrawerOpen(false);
    };

    // --------- DELETE CARD ------------
    const deleteCardHandler = (id: string) => {
        const updatedData = fakeData.filter((item) => item.id !== id);
        localStorage.setItem('toDoList', JSON.stringify(updatedData));
        setFakeData(updatedData);
        setFilteredData(updatedData);
    };

    // --------- CHANGE STATUS OF CARD ---------
    const toggleStatus = (id: string) => {
        const updatedData = fakeData.map((item) =>
            item.id === id ? {...item, status: !item.status} : item
        );
        localStorage.setItem('toDoList', JSON.stringify(updatedData));
        setFakeData(updatedData);
        setFilteredData(updatedData);
    };

    // ---------- FILTER FUNCTION -------------------
    const filterFunction = (searchTerm: string) => {
        if (!searchTerm) {
            setFilteredData(fakeData); // Reset if no search term
        } else {
            const filterFunction = filterByField[searchBaseType];
            const filtered = filterFunction ? fakeData.filter(filterFunction) : fakeData;
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        prefetch();
    }, []);

    useEffect(() => {
        filterFunction(searchTerm); // Call filter on search term change
    }, [searchTerm, fakeData]);

    return (
        <Box sx={{
            backgroundColor: '#eceff1'
        }}>
            <Container
                sx={{
                    padding: '10px',
                    paddingTop: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',

                }}
            >
                <Typography mx="auto" variant="h5" mb={3}>
                    To Do List
                </Typography>
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    mb={3}
                    width="100%"
                >
                    <SearchBaseSelectBox searchBaseType={setSearchBaseType}/>
                    <TextField
                        id="standard-basic"
                        label="Search"
                        variant="standard"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                    />

                    <Button variant="contained" onClick={() => openForm()}>
                        New
                    </Button>
                </Stack>
                <Stack width="100%" direction="column" spacing={2}>
                    {fakeData.length < 1 ? (
                        <NoData/>
                    ) : (
                        <>
                            {filteredData.map((item) => (
                                <ToDoCard
                                    key={item?.id}
                                    deleteCardHandler={deleteCardHandler}
                                    openForm={openForm}
                                    data={item}
                                    toggleStatus={toggleStatus}
                                />
                            ))}
                        </>
                    )}
                </Stack>
            </Container>
            <Drawer anchor="right" open={isDrawerOpen} onClose={closeForm}>
                <ToDoForm
                    item={selectedItem as FormTypes}
                    prefetch={prefetch}
                    setOpen={setIsDrawerOpen}
                />
            </Drawer>
        </Box>
    );
}
