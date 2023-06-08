import {Button, Card, CardContent, Grid, InputAdornment, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";

export function LoginView() {

    return (<Card>
            <CardContent

            >
                <Grid container spacing={3}>
                    <Grid item sm={12}>
                        <TextField
                            label="Enter your email"
                            type="email"
                            // value={email}
                            // onChange={(event) => setEmail(event.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            label="Enter your password"
                            type="password"
                            fullWidth
                            // value={password}
                            // onChange={(event) => setPassword(event.target.value)}
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                        <IconButton>
                                            <i className="fas fa-eye"></i>
                                        </IconButton>
                                    </InputAdornment>),
                            }}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            // onClick={handleLogin}
                        >
                            Login
                        </Button>
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