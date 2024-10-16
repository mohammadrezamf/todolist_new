import React from 'react';
import {FormTypes} from '@/app/components/index.types';
import {Box, Button, Checkbox, Chip, Paper, Stack, Typography} from '@mui/material';

type Props = {
    data: FormTypes;
    toggleStatus: (id: string) => void;
    deleteCardHandler: (id: string) => void;
    openForm: (item: FormTypes) => void;
};

const ToDoCard = ({data, toggleStatus, deleteCardHandler, openForm}: Props) => {
    return (
        <Paper sx={{padding: '10px'}}>
            <Stack justifyContent="space-between" alignItems="center" direction="row">
                <Box>
                    <Typography ml={1} mb={1}>{data.title}</Typography>
                    <Stack alignItems="center" direction="row" spacing={2}>
                        <Chip label={data.severity}/>
                        <Chip label={`${data.time} hour`}/>
                        <Checkbox
                            checked={data.status}
                            onChange={() => toggleStatus(data?.id as string)}
                        />
                    </Stack>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        onClick={() => deleteCardHandler(data?.id as string)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => openForm(data)}
                    >
                        Edit
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ToDoCard;
