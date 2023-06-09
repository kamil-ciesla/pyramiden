import {Button, Card, CardContent, Grid, InputAdornment, Link, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {handleLogin, handleGoogleLogin} from '../../auth/firebaseAuth'
import {useState} from "react";
import {Google as GoogleIcon} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {routes} from "../../routes";

export function LoginView() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <Card
        sx={{
            width: '70%'
        }}
    >
        <CardContent

        >
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Typography variant={'h4'}>
                        Login
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
                        label="Enter your password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton>
                                    <i className="fas fa-eye"></i>
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item sm={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            handleLogin(email, password).then((userCredential) => {
                                navigate(routes.accountView)
                            }).catch(error => console.log(error.message))
                        }}
                    >
                        Login
                    </Button>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body2" color="textSecondary"
                    >
                        Don't have an account? <Link>Register now</Link>
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<GoogleIcon/>}
                        onClick={() => {
                            handleGoogleLogin().then(userCredential => {
                                navigate(routes.accountView)
                            }).catch(error => console.log(error.message))
                        }}
                    >
                        Google
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

}