import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../auth/firebaseAuth";
import {Box, List,ListItem, ListItemText, Typography,} from "@mui/material";
import * as firestore from "../../components/Plan/firestorePlan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {routes} from "../../routes";
import { Link } from 'react-router-dom';

export const AccountView = () => {
    const {currentUser} = useContext(AuthContext);
    const [plans, setPlans] = useState([])
    useEffect(() => {
        if (currentUser) fetchPlans()
    }, [currentUser])

    async function fetchPlans() {
        const plans = await firestore.getAllUserPlans(currentUser.uid)
        setPlans(plans)
        console.log(plans)
    }

    return (
        currentUser ?
            <Box
                sx={{
                    border: '2px solid red'
                }}>
                <List>
                    {
                        plans.map((plan, index) => (
                            <Link to={routes.planView}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                >
                                    {/*<ListItemAvatar>*/}
                                    {/*    <Avatar>*/}
                                    {/*        <FolderIcon/>*/}
                                    {/*    </Avatar>*/}
                                    {/*</ListItemAvatar>*/}
                                    <ListItemText
                                        primary={plan.data.title}
                                        // secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </Box>
            :
            <Typography>
                YOU SHOULD NOT BE HERE
            </Typography>
    )
}