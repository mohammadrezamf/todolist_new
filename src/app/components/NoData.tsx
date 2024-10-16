import React from 'react';
import {Card, Container, Typography} from '@mui/material';

const NoData = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
            }}
        >
            <Card>
                <Typography variant="h3" m={5}>
                    First add new task
                </Typography>
            </Card>
        </Container>
    );
};

export default NoData;
