import {Button, Card, CardContent, Grid, InputAdornment, Link, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";

import {handleRegister} from '../../auth/firebaseAuth'

export function RegisterView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    return (<Card
            sx={{
                width: '70%'
            }}
        >
            <CardContent

            >
                <Grid container spacing={3}>
                    <Grid item sm={12}>
                        <Typography variant={'h4'}>
                            Register
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            label="Enter your email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <i className="fas fa-eye"></i>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item sm={12}>
                        <TextField
                            label="Confirm password"
                            type="password"
                            value={repeatedPassword}
                            onChange={(event) => {
                                setRepeatedPassword(event.target.value);
                            }}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <i className="fas fa-eye"></i>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => handleRegister(email, password, repeatedPassword)}
                        >
                            Register
                        </Button>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="body2" color="textSecondary"
                        >
                            Already have an account? <Link>Login now</Link>
                        </Typography>
                    </Grid>
                </Grid>
                {/*{*/}
                {/*    loginError && (*/}
                {/*        <Alert severity="error">*/}
                {/*            <AlertTitle>Login error</AlertTitle>*/}
                {/*            Please check your credentials and try again.*/}
                {/*        </Alert>*/}
                {/*    )*/}
                {/*}*/}
            </CardContent>
        </Card>

    )

}