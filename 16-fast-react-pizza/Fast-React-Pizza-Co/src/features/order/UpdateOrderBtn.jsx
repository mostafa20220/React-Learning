import React from 'react'
import Button from '../../ui/Button';
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

export default function UpdateOrderBtn() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method='PATCH' className='text-right'>
    <Button>Make Priority </Button>
    </fetcher.Form>
  )
}


export async function action ({req,params}){

  const {orderId} = params;
  const updateObj = {priority:true};

  await updateOrder(orderId, updateObj);
  return null; 
}