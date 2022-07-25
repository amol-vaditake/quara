import { Card, List, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import UserIcon from '@material-ui/icons/AccountCircle';
import store from "../store";
import { logoutUser } from "../actions/authActions";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user } = useSelector(state => state.auth)
		let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }

    return (
        <>
            <Grid container style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
                <Grid item xs={12} md={8} lg={6}>
                    <Card style={{ width: "100%", padding: 24, borderRadius: 24 }}>
                        <Typography variant="h4" style={{textAlign: "center"}}>User Profile{user.role==='admin'&&' (Admin)'}</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <UserIcon />
                                </ListItemAvatar>
                                <ListItemText primary={`${user.name}`}></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <MailOutlineIcon />
                                </ListItemAvatar>
                                <ListItemText primary={`${user.email}`}></ListItemText>
                            </ListItem>
                            <ListItem onClick={() => { 
															store.dispatch(logoutUser()) 
															goToTheRoute('/')
															
															}} style={{ cursor: "pointer" }}>
                                <ListItemAvatar>
                                    <ExitToAppIcon />
                                </ListItemAvatar>
                                <ListItemText primary="Logout"></ListItemText>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}