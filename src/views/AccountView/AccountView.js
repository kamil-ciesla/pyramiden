import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../auth/firebaseAuth";
import {Box, Button, Card, CardContent, List, ListItem, ListItemText, TextField, Typography,} from "@mui/material";
import * as firestore from "../../components/Plan/firestorePlan";
import IconButton from "@mui/material/IconButton";
import {routes} from "../../routes";
import {Link, useNavigate} from 'react-router-dom';
import ClearIcon from "@mui/icons-material/Clear";

export const AccountView = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const [plans, setPlans] = useState([])
    const [newPlanTitle, setNewPlanTitle] = useState(null)

    useEffect(() => {
        if (currentUser) {
            fetchPlans()
        } else {
            navigate(routes.loginView)
        }
    }, [currentUser])

    async function fetchPlans() {
        const plans = await firestore.getAllUserPlans(currentUser.uid)
        setPlans(plans)
    }

    async function handleCreatePlan() {
        await firestore.createPlan(currentUser.uid, newPlanTitle)
        fetchPlans()
    }

    async function handleDeletePlan(planId) {
        if (window.confirm("Are you sure you delete this plan? (It will be deleted forever)")) {
            await firestore.deletePlan(currentUser.uid, planId)
            fetchPlans()
        }
    }

    return (
        currentUser &&
        <Card
            sx={{
                // border: '2px solid red'
            }}>
            <CardContent>
                <List>
                    {
                        plans.map((plan, index) => (
                            <>
                                <ListItem className='plan-list-item'
                                          onMouseOver={(e) => {
                                              e.currentTarget.querySelector('.delete-plan-button').style.visibility = 'visible';
                                          }}
                                          onMouseOut={(e) => {
                                              e.currentTarget.querySelector('.delete-plan-button').style.visibility = 'hidden';
                                          }}
                                          secondaryAction={
                                              <IconButton
                                                  className='delete-plan-button'
                                                  aria-label="delete"
                                                  size="large"
                                                  onClick={() => {
                                                      handleDeletePlan(plan.planId)
                                                  }}
                                                  style={{visibility: 'hidden'}}
                                              >
                                                  <ClearIcon/>
                                              </IconButton>
                                          }
                                >
                                    <Link to={routes.planViewById(plan.planId)} style={{textDecoration: 'none'}}>
                                        <Typography variant={'h5'} sx={{color: 'black'}}>
                                            {plan.data.title}
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <hr/>
                            </>
                        ))
                    }
                    <ListItem
                        sx={{display: 'flex', alignItems: 'stretch'}}
                    >
                        <TextField
                            label="Enter plan title"
                            value={newPlanTitle}
                            sx={{flexGrow: 1}}
                            onChange={(e) => setNewPlanTitle(e.target.value)}
                        />
                        <Button variant="contained"
                                onClick={handleCreatePlan}
                                sx={{flexGrow: 1}}
                        >
                            Create plan
                        </Button>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}