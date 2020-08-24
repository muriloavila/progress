import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiSpace from '../../config/spaceApi';
import Header from '../Header';

export default function Edit() {
    const query = parse(window.location.search);
    if(!query.id) {
        window.location.href = '/new';
    }

    const [space, setSpace]:any = useState([]);
    
    
    useEffect(() => {
        const getSpaceData = async () => {
            apiSpace.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            
            const spaceData:any = await apiSpace.get(`/space/${query.id}`).catch((err) => {
                if(err.response.status === 401){
                    alert('Sua sessão Expirou, por favor realize o Login Novamente');
                    window.location.href = '/';
                    return false;
                }
    
                alert('Erro ao buscar os dados');
                return false;
            });

            setSpace(spaceData.data);
        }
        getSpaceData();
        // eslint-disable-next-line
    }, []);
    
    
    const {register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async ({name, description, projeto}) => {
        apiSpace.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        // eslint-disable-next-line
        const responseUpdate:any = await apiSpace.patch(`/space/${query.id}`, {
            name: name,
            description: description,
            projeto: projeto
        }).catch((err) => {
            if(err.response.status === 401){
                alert('Sua sessão expirou, por favor realizar novamente o Login');
                window.location.href = '/';
                return false;
            }

            alert('Erro ao realizar a alteração');
            return false;
        })

        alert('Registro atualizado com sucesso!');
        window.location.href = `/list`;
    })

    return (
        <div>
            <Header />
            <h3>Edição de Espaçonave</h3>
            <form onSubmit={onSubmit}>
                <label>Nome</label><br />
                <input name="name" ref={register} defaultValue={space.name}/><br />
                <label>Descrição</label><br />
                <textarea rows={3} cols={50} name="description" ref={register} defaultValue={space.description}/><br />
                <label>Projeto</label><br />
                <textarea rows={3} cols={50}  name="projeto" ref={register} defaultValue={space.projeto}/><br />
                <input type="submit" value="Inserir" />
            </form>
        </div>
    )
}