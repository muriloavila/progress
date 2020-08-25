import React, { useEffect, useState } from 'react';
import apiSpace from '../../config/spaceApi';
import Header from '../Header';



export default function Random() {
    const [space, setSpace]:any = useState([{id: '', name: '', description: ''}]);
    
    useEffect(() => {
        const getNextProject = async() => {
            apiSpace.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const next:any = await apiSpace.get('/space/next').catch((err) => {
                if(err.response.status === 401) {
                    alert('Sessão Expirada, por favor realize novamente o Login');
                    window.location.href = '/';
                    return false;
                }
    
                alert('Erro ao realizar operação, por favor tente novamente');
                return false;
            });
            if(next.status === 200 && next.data.space !== null){                
                setSpace(next.data.space);
            }
        }
        getNextProject();
    }, []);


    
    return (
        <div>
            <Header />
            <h3>Próxima Nave:</h3>
            <table style={{border: "1px solid black"}}>
                <thead style={{border: "1px solid black"}}>
                    <tr style={{border: "1px solid black"}}>
                        <th style={{border: "1px solid black"}}>Nome</th>
                        <th style={{border: "1px solid black"}}>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                <tr style={{border: "1px solid black"}} key={space._id}>
                    <td style={{border: "1px solid black"}}>{space.name}</td>
                    <td style={{border: "1px solid black"}}>{space.description}</td>
                </tr>
                </tbody>
            </table>
 
        </div>

    )
}