import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap'


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        email:'', password:''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    },[])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {

        }
    }


    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {

        }
    }

    return (

        <Card className="bg-dark text-white">
            <Card.Body>
                <Card.Title><h1>IMDB CLONE</h1></Card.Title>
                <div>
                    <div className="input-field">
                        <label className="reg-lbl" htmlFor="email" >Email</label>
                        <input placeholder="Email" id="email" type="text" name="email" value={form.email} onChange={changeHandler}/>
                    </div>
                    <div className="input-field">
                        <label className="reg-lbl" htmlFor="password">Password</label>
                        <input placeholder="Password" id="password" type="password" name="password" value={form.password} onChange={changeHandler}/>
                    </div>
                </div>

                <div className="card-action">
                        <Button variant="warning"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Log In
                        </Button>{' '}
                        <Button variant="warning"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </Button>{' '}
                    </div>
            </Card.Body>
        </Card>
        
    )
}