import {Button, Card, CardContent, Grid, InputAdornment, Link as MuiLink, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {handleGoogleLogin, handleLogin} from '../../auth/firebaseAuth'
import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {routes} from "../../routes";
import GoogleIcon from '@mui/icons-material/Google';

import * as firestore from "../../components/Plan/firestorePlan";

export function LoginView() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRedirectAfterLogin(userId) {
        const userPlans = await firestore.getAllUserPlans(userId)
        if (userPlans.length) {
            navigate(routes.accountView)
        } else {
            navigate(routes.planView)
        }
    }

    useEffect(() => {

    })

    return <Card
        sx={{
            width: '70%'
        }}
    >
        <CardContent>
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
                            handleLogin(email, password).then(userCredential => {
                                handleRedirectAfterLogin(userCredential.user.uid)
                            }).catch(error => console.log(error.message))
                        }}
                    >
                        Login
                    </Button>
                </Grid>
                <Grid item sm={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="body2" color="textSecondary">
                        Don't have an account?
                    </Typography>
                    <Typography variant="body2" sx={{marginLeft: '0.5rem'}}>
                        <RouterLink to={routes.registerView} style={{textDecoration: 'none'}}>
                            <MuiLink underline='none'>
                                Register now
                            </MuiLink>
                        </RouterLink>
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<GoogleIcon/>}
                        onClick={() => {
                            handleGoogleLogin()
                                .then(userCredential => {
                                    handleRedirectAfterLogin(userCredential.user.uid)
                                }).catch(error => console.log(error.message))
                        }}
                    >
                        Login with Google
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