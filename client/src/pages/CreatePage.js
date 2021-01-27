import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import {MainCarousel} from '../components/MainCarousel';

export const CreatePage = () => {
    const auth = useContext(AuthContext);
    const  {request} = useHttp();
    const [link, setLink] = useState('');
    useEffect(()=>{
        window.M.updateTextFields()
    }, [])
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
             const data = await request('/api/link/generate', 'POST', {from: link}, {
                 Authorization: `Bearer ${auth.token}`
             });
            } catch (e) {
                
            }
        }
    }
    return (
        <div className="row">
            <MainCarousel />
        </div>
    )
}