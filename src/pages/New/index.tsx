import React from 'react';
import { useForm } from 'react-hook-form';
import apiSpace from '../../config/spaceApi';
import Header from '../Header';

export default function New() {
    const {register, handleSubmit} = useForm();

    const onSubmit = handleSubmit(async({name, description, projeto}) => {
        apiSpace.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        const insert:any = await apiSpace.post('/space', {
            name: name,
            description: description,
            projeto: projeto
        }).catch((err) => {
            if(err.response.status === 401) {
                alert('Sessão Expirada, por favor realize novamente o Login');
                window.location.href = '/';
                return false;
            }
            
            alert('Erro ao inserir');
            console.log(err);
            return false;
        });

        if(insert.status === 201){
            alert('Registro Inserido com Sucesso!');
            window.location.href = '/new';
        }

    });


    return (
        <div>
            <Header />
            <h3>Registro de Nova Espacionave</h3>
            <form onSubmit={onSubmit}>
                <label>Nome</label><br />
                <input name="name" ref={register}/><br />
                <label>Descrição</label><br />
                <textarea rows={3} cols={50} name="description" ref={register}/><br />
                <label>Projeto</label><br />
                <textarea rows={3} cols={50}  name="projeto" ref={register}/><br />
                <input type="submit" value="Inserir" />
            </form>
        </div>
    );
}