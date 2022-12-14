import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Card from '../Card';
import IconBusca from '../../assets/icon-busca.png'
import './styles.css';

const CardList: React.FC = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('')
  useEffect(() => {
    let consultaAPI = async () => {
      await api.get('/users')
        .then(response => {
          setUsers(response.data)
          setLoading(false)
        })
    }

    if (loading) {
      consultaAPI();
    }
  }, [])
  function handleSearchText(event: any) {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  function handleDelete(id: string) {
    setUsers(users => users.filter((user: any) => user.id !== id))
  }
  function displayContact() {
    
     
    return users.map(usuario => <Card key={usuario.id} user={usuario} del={handleDelete} />)
    
  }

  if (loading) {
    return <div>Carregando..</div>
  } else {
    return (<div className="card_list_container">
      
      {displayContact()}
    </div>);
  }
}

export default CardList;