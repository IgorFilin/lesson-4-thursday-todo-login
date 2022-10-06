import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/TodolistsList/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {authAPI} from "../api/todolists-api";
import {initializeAppTC, logoutTC} from "../features/TodolistsList/Login/authReducer";
import {CircularProgress} from "@mui/material";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const onClickHandlerLogout = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={onClickHandlerLogout} color="inherit">Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'login/'} element={<Login/>}/>
                    <Route path={'404/'}
                           element={<div style={{display: 'flex', justifyContent: 'center', paddingTop: '150px'}}>
                               <h1>404 not found</h1></div>}/>
                    <Route path={'*'} element={<Navigate to={'404/'}/>}/>
                </Routes>

            </Container>
        </div>
    )
}

export default App
