import React, {useEffect} from 'react';
import {Box, Button, ButtonGroup, Stack, TextField, Typography} from "@mui/material";
import {useForm} from '@mantine/form';
import {FormTypes} from "@/app/components/index.types";
import {v4} from 'uuid'


type Props = {
    setOpen: (value: boolean) => void;
    prefetch: () => void;
    item: FormTypes
}

export default function ToDoForm(props: Props) {


    const form = useForm<FormTypes>({
        initialValues: {
            title: '',
            severity: 'low',
            status: false,
            time: "5",
        },
    });

    const handleSubmit = (values: FormTypes) => {
        if (props.item?.id) {
            const newRecord = {
                id: props.item.id,
                title: values.title,
                severity: values.severity,
                status: props.item.status,
                time: `${values.time}h`,
            };
            const fakeDataForEdit = JSON.parse(localStorage.getItem('toDoList'));

            const findIndex = fakeDataForEdit.findIndex((item: FormTypes) => {
                return item.id === props.item.id;
            })
            console.log(findIndex)
            fakeDataForEdit.splice(findIndex, 1, newRecord)
            localStorage.setItem('toDoList', JSON.stringify(fakeDataForEdit));
            props.prefetch()
            props.setOpen(false)
            form.reset()
        } else {
            const newRecord = {
                id: v4(),
                title: values.title,
                severity: values.severity,
                status: false,
                time: `${values.time}h`,
            };
            const existingData = localStorage.getItem('toDoList');
            const parsedData = existingData ? JSON.parse(existingData) : [];
            const updatedData = [...parsedData, newRecord];
            localStorage.setItem('toDoList', JSON.stringify(updatedData));
            form.reset();
            props.prefetch()
            props.setOpen(false);
        }
    };


    useEffect(() => {
        if (props.item?.id) {
            form.setValues({
                id: props.item?.id,
                title: props.item?.title,
                status: props.item?.status,
                severity: props.item?.severity,
                time: `${props.item?.time}h`,
            })
        }
    }, [props.item?.id])

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack justifyContent='space-between' px={4} py={10} spacing={4}>
                <Typography variant="h6">
                    New To-Do List
                </Typography>
                <TextField key={form.key('title')}{...form.getInputProps('title')} label="Title"
                           variant="outlined"
                           fullWidth/>
                <TextField key={form.key('time')} {...form.getInputProps('time')} label="Time" variant="outlined"
                           size="small"/>
                <Box>
                    <Typography>
                        Severity
                    </Typography>
                    <ButtonGroup variant="contained" aria-label="severity">
                        <Button
                            color={form.values.severity === 'high' ? 'success' : 'primary'}
                            onClick={() => form.setFieldValue('severity', 'high')}
                        >
                            High
                        </Button>
                        <Button
                            color={form.values.severity === 'medium' ? 'success' : 'primary'}
                            onClick={() => form.setFieldValue('severity', 'medium')}
                        >
                            Medium
                        </Button>
                        <Button
                            color={form.values.severity === 'low' ? 'success' : 'primary'}
                            onClick={() => form.setFieldValue('severity', 'low')}
                        >
                            Low
                        </Button>
                    </ButtonGroup>
                </Box>
                <Button type='submit' variant="contained" color="success" size="large">
                    Create
                </Button>
            </Stack>
        </form>
    )
}
