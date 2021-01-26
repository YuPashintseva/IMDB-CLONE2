import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';

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
             console.log(data)
            } catch (e) {
                
            }
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field">
                <input 
                    placeholder="Put the link" 
                    id="link" 
                    type="text" 
                    onChange={e => setLink(e.target.value)}
                    onKeyPress ={pressHandler}
                />
                <label htmlFor="link">Put the link</label>
            </div>
            </div>
        </div>
    )
}