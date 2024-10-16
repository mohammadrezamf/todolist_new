import React, {useEffect} from 'react';
import {Box, Button, ButtonGroup, Stack, TextField, Typography} from '@mui/material';
import {isInRange, isNotEmpty, useForm} from '@mantine/form';
import {FormTypes} from '@/app/components/index.types';
import {v4 as uuidv4} from 'uuid';

type Props = {
    setOpen: (value: boolean) => void;
    prefetch: () => void;
    item: FormTypes;
};

export default function ToDoForm({setOpen, prefetch, item}: Props) {
    const form = useForm<FormTypes>({
        initialValues: {
            title: '',
            severity: 'low',
            status: false,
            time: '0',
        },
        validate: {
            title: isNotEmpty(),
            time: isNotEmpty(),
        },
        validateInputOnChange: true,
        validateInputOnBlur: true,
    });

    const saveToDoList = (data: FormTypes[]) => {
        localStorage.setItem('toDoList', JSON.stringify(data));
    };

    const getToDoList = (): FormTypes[] => {
        const storedData = localStorage.getItem('toDoList');
        return storedData ? JSON.parse(storedData) : [];
    };

    const handleSubmit = (values: FormTypes) => {
        const toDoList = getToDoList();

        const newRecord = {
            id: item?.id || uuidv4(),
            title: values.title,
            severity: values.severity,
            status: item?.status || false,
            time: `${values.time}h`,
        };

        if (item?.id) {
            const updatedList = toDoList.map((todo) => (todo.id === item.id ? newRecord : todo));
            saveToDoList(updatedList);
        } else {
            const updatedList = [...toDoList, newRecord];
            saveToDoList(updatedList);
        }

        form.reset();
        prefetch();
        setOpen(false);
    };

    useEffect(() => {
        if (item?.id) {
            form.setValues({
                id: item.id,
                title: item.title,
                status: item.status,
                severity: item.severity,
                time: `${item.time}h`,
            });
        }
    }, [item?.id]);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack justifyContent="space-between" px={4} py={10} spacing={4}>
                <Typography variant="h6">New To-Do List</Typography>

                <TextField
                    {...form.getInputProps('title')}
                    label="Title"
                    variant="outlined"
                    fullWidth
                />

                <TextField
                    {...form.getInputProps('time')}
                    label="Time"
                    variant="outlined"
                    size="small"
                />

                <Box>
                    <Typography>Severity</Typography>
                    <ButtonGroup variant="contained" aria-label="severity">
                        {['high', 'medium', 'low'].map((level) => (
                            <Button
                                key={level}
                                sx={{
                                    backgroundColor: form.values.severity === level ? 'success.main' : 'primary.main',
                                }}
                                onClick={() => form.setFieldValue('severity', level)}
                            >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>

                <Button
                    disabled={!form.isValid()}
                    type="submit"
                    variant="contained"
                    color="success"
                    size="large"
                >
                    {item?.id ? 'Update' : 'Create'}
                </Button>
            </Stack>
        </form>
    );
}
