import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../config/api';
import apiSpace from '../../config/spaceApi';



export default function Login() {
    const {register, handleSubmit} = useForm();
    const onSubmit = handleSubmit(async ({ username, password }) => {
        const response:any = await api.get(`/auth?username=${username}&password=${password}`)
                                    .catch((err) => {
                                        if(err.response.status === 401){
                                            alert('Usuario/Senha incorretos');
                                            apiSpace.defaults.headers.common['Authorization'] = false;

                                        }
                                    });
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            window.location.href = "/home";
        }
      });

    return (
        <form onSubmit={onSubmit}>
            <label>Usuário</label> <br />
            <input name="username" id="username" ref={register} /> <br />
            <label>Senha</label><br />
            <input type="password" name="password" ref={register} /> <br />
            <input type="submit" value="Entrar"/>
        </form>
    )
}