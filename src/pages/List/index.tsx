import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiSpace from '../../config/spaceApi';
import Header from '../Header';

export default function List() {
    const [spaces, setSpace] = useState([]);
    
    useEffect(() => {
        const getAll = async () => {
            apiSpace.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            const response:any = await apiSpace.get('/').catch((err) => {
                if(err.response.status) {
                    alert('Sessão Expirada, por favor realize novamente o Login');
                    window.location.href = '/';
                }
            });

            setSpace(response.data.spaces);
        }
        getAll();
    }, []);

    const removeSpace = async (space:any) => {
        const validaCorrecao = window.confirm(`Deseja Remover a Espaçonave: ${space.name}`);

        if(!validaCorrecao) return false;

        apiSpace.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        
        // eslint-disable-next-line
        const response:any = await apiSpace.delete(`/space/${space._id}`).catch((err) => {
            if(err.response.status === 401) {
                alert('Sessão Expirada, por favor realize novamente o Login');
                window.location.href = '/';
                return false;
            }

            alert('Erro ao realizar operação, por favor tente novamente');
            return false;
        });

        alert('Registro deletado com sucesso!');
        window.location.href = '/list';

    };

    return (
        <div>
            <Header />
            <h3>Listagem de todos os Projetos</h3>
            <table style={{border: "1px solid black"}}>
                <thead style={{border: "1px solid black"}}>
                    <tr style={{border: "1px solid black"}}>
                        <th style={{border: "1px solid black"}}>Nome</th>
                        <th style={{border: "1px solid black"}}>Descrição</th>
                        <th style={{border: "1px solid black"}}>Projeto</th>
                        <th style={{border: "1px solid black"}}>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {spaces.map((space:any, index:any) => (
                        <tr style={{border: "1px solid black"}} key={index}>
                            <td style={{border: "1px solid black"}}>{space.name}</td>
                            <td style={{border: "1px solid black"}}>{space.description}</td>
                            <td style={{border: "1px solid black"}}>{space.projeto}</td>
                            <td style={{border: "1px solid black"}}>
                                <Link to={{
                                    pathname: '/edit',
                                    search: `id=${space._id}`,
                                    state: {from: '/list'}
                                }}>Alterar</Link> <Link to={'/list'} onClick={() => removeSpace(space)}>Remover</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}