import {
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField
} from "@mui/material";
import {Currency} from "../Currency/Currency";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {createRandomId} from "../../idGenerator";
import ClearIcon from "@mui/icons-material/Clear";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export function Budget(props) {
    const [costs, setCosts] = useState(props.costs)
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    function addCost() {
        const updatedCosts = [...costs]
        const newCost = {
            id: createRandomId(),
            name: '',
            value: 0,
        }
        updatedCosts.push(newCost)
        setCosts(updatedCosts)
    }

    function updateCosts(newCost, index) {
        const updatedCosts = [...costs]
        updatedCosts[index] = newCost
        setCosts(updatedCosts)
    }

    function handleDeleteCost(costId) {
        setCosts(costs => costs.filter(cost => cost.id !== costId))
    }

    function isOverBudget() {
        if (Number(props.budget) > 0) {
            return (sumCosts() > Number(props.budget))
        } else {
            return false
        }
    }

    function sumCosts() {
        return costs.reduce((a, b) =>
            a + b.value, 0
        )
    }

    useEffect(() => {
        props.onChange({
            target: {
                name: 'costs',
                value: costs
            }
        })
    }, [costs])

    return (
        <Card>
            <CardContent
                sx={{
                    display: "flex", flexDirection: "column"
                }}
            >
                <Typography variant='h5' textAlign='left'>Budget</Typography>

                <Box
                    sx={{
                        display: "flex", flexDirection: "row"
                    }}
                >
                    <Currency
                        name='currency'
                        currency={props.currency}
                        onChange={props.onChange}
                    />
                    <TextField
                        name='budget'
                        label="Budget"
                        type='number'
                        placeholder={"set up a budget"}
                        value={props.budget}
                        onChange={props.onChange}
                        inputProps={{
                            style: {
                                fontWeight: 'bold'
                            }
                        }}
                    />

                    <TextField
                        InputProps={{
                            readOnly: true,
                            style: {
                                fontWeight: 'bold'
                            }
                        }}
                        variant='filled'
                        name='tripCost'
                        label="Trip cost"
                        value={sumCosts()}
                        error={isOverBudget()}
                        helperText={
                            isOverBudget() ?
                                'Over budget!'
                                :
                                ''
                        }
                        onChange={props.onChange}
                    />
                </Box>
                <ListItem onClick={handleClick}>
                    <ListItemText>
                        <Typography variant='h5' textAlign='left'>Expenses</Typography>
                    </ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        {
                            costs.map((cost, index) => {
                                return (
                                    <ListItem key={cost.id}>
                                        <TextField
                                            value={cost.name}
                                            id="cost-name"
                                            label="Cost"
                                            variant="outlined"
                                            type="text"
                                            onChange={e => {
                                                updateCosts({...cost, name: e.target.value}, index)
                                            }}
                                        />
                                        <TextField
                                            value={String(cost.value)}
                                            type="number"
                                            id="cost-value"
                                            label="value"
                                            variant="outlined"
                                            onChange={e => {
                                                updateCosts({...cost, value: Number(e.target.value)}, index)
                                            }}
                                        />
                                        <IconButton
                                            className='delete-cost-button'
                                            aria-label="delete"
                                            size="large"
                                            onClick={() => {
                                                handleDeleteCost(cost.id)
                                            }}
                                        >
                                            <ClearIcon/>
                                        </IconButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    <Button variant="contained" color="primary" onClick={addCost}
                    >
                        Add Cost
                    </Button>
                </Collapse>

            </CardContent>
        </Card>
    )
}