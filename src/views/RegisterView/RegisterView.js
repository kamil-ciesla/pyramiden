import {Button, Card, CardContent, Grid, InputAdornment, Link as MuiLink, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useContext, useEffect, useState} from "react";

import {AuthContext, handleGoogleLogin, handleRegister} from '../../auth/firebaseAuth'
import {routes} from "../../routes";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import * as firestore from "../../components/Plan/firestorePlan";
import {Google as GoogleIcon} from "@mui/icons-material";

export function RegisterView() {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    async function handleRedirectAfterLogin(userId) {
        const userPlans = await firestore.getAllUserPlans(userId)
        if (userPlans.length) {
            navigate(routes.accountView)
        } else {
            navigate(routes.planView)
        }
    }

    useEffect(() => {
        if (currentUser) {
            navigate(routes.accountView)
        }
    }, [])

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
                            onClick={() => {
                                handleRegister(email, password, repeatedPassword).then(userCredential => {
                                    navigate(routes.planView)
                                })
                            }}
                        >
                            Register
                        </Button>
                    </Grid>
                    <Grid item sm={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="body2" color="textSecondary">
                            Already have an account?
                        </Typography>
                        <Typography variant="body2" sx={{marginLeft: '0.5rem'}}>
                            <RouterLink to={routes.loginView} style={{textDecoration: 'none'}}>
                                <MuiLink underline='none'>
                                    Login now
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

    )

}