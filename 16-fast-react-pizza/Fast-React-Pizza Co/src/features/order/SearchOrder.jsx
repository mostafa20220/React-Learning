import React, { useState } from 'react'
import { getOrder } from '../../services/apiRestaurant';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
  const [searchQuery,setSearchQuery] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();

    navigate(`/order/${searchQuery}`);
    setSearchQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Order Id...' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
    </form>
  )
}

export async function loader({params}){
  console.log(params);
  return await getOrder(params.orderId);
}
