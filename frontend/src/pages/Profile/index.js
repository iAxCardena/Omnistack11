import React, {useState, useEffect} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api'

//Intl - formatacao de datas e valores. 

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    
    useEffect(() => {   //recebe dois param: qual funcao para seer executada; e o segundo eh qdo ela sera executada. toda vez que o segundo param (array) mudar, ele vai executar a funcao
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);    
        })
    }, [ongId]);    

    async function handleDeleteIncident(id){  //recebe o id do caso que sera deletado
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));  //realiza uma varedura no array de incidentes procurando o q tem o ID e remove-lo
        } catch (err) {
            alert('Erro ao deleter caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear(); //limpa todo o localStorage
        
        history.push('/');
    }

     return(
         <div className="profile-container">
             <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
             </header>
             <h1>Casos cadastrados</h1>

             <ul>
                 {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRICAO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                 ))}
             </ul>
         </div>
     )
 }

