import React from 'react';
import {Card, Container, Typography} from '@mui/material';

const NoData = () => {
    return (
        <Container
            sx={{
                padding: '10px',
                paddingTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Card>
                <Typography variant="h3" m={20}>
                    First add new task
                </Typography>
            </Card>
        </Container>
    );
};

export default NoData;
