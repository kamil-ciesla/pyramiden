import { Input, Card, CardContent, Typography } from '@mui/material';


export const Tripmates = () => {

    return (
        <Card className="tripmates">
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>
                    Tripmates
                </Typography>
                <Input></Input>
                <Input></Input>
                <Input></Input>
            </CardContent>
        </Card>
    )
}