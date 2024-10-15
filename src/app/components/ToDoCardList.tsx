'use client'

import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, Chip, Container, Drawer, Paper, Stack, Typography} from "@mui/material";
import ToDoForm from "@/app/components/ToDOForm";
import {FormTypes} from "@/app/components/index.types";


export default function ToDoCardList() {
    const [fakeData, setFakeData] = useState<FormTypes[]>([]);
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    useEffect(() => {
        prefetch()
    }, []);

    function prefetch() {
        const savedData = localStorage.getItem('toDoList');
        if (savedData) {
            setFakeData(JSON.parse(savedData));
        }
    }

    return (
        <>

            <Container
                sx={{
                    padding: '10px',
                    paddingTop: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <Typography mx='auto' variant="h5" mb={3}>
                    To do list
                </Typography>
                <Stack alignItems='center' direction="row" spacing={2} mb={3}>
                    <Typography>
                        search
                    </Typography>
                    <Button onClick={toggleDrawer(true)}>
                        new
                    </Button>
                </Stack>
                <Stack width='100%' direction="column" spacing={2}>
                    {fakeData.map((item) => (
                        <Paper sx={{padding: '10px'}}>
                            <Stack justifyContent='space-between' alignItems='center' direction='row'>
                                <Box>
                                    <Typography>
                                        {item.title}
                                    </Typography>
                                    <Stack direction='row' spacing={2}>
                                        <Chip label={item.severity}/>
                                        <Checkbox value={item.status}/>
                                    </Stack>
                                </Box>
                                <Stack direction='row' spacing={2}>
                                    <Button variant="outlined">
                                        delete
                                    </Button>
                                    <Button variant="outlined">
                                        EDIT
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            </Container>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <ToDoForm prefetch={prefetch} setOpen={setOpen}/>
            </Drawer>
        </>
    )
}

