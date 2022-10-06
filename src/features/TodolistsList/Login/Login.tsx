import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./authReducer";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../../app/store";

export const Login = () => {
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required email'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required password'
            } else if (values.password.length < 3) {
                errors.password = 'Password under 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return  <Navigate to={'/'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField {...formik.getFieldProps('email')} name='email' label="Email" margin="normal"
                                   value={formik.values.email}/>
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red', textAlign: 'center'}}>{formik.errors.email}</div> : <br/>}
                        <TextField  {...formik.getFieldProps('password')} type="password"
                                    label="Password"
                                    margin="normal"
                                    value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: 'red', textAlign: 'center'}}>{formik.errors.password}</div> : <br/>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                             checked={formik.values.rememberMe}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}