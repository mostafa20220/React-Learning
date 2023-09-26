import React from 'react'
import Button from '../../ui/Button';
import { removeItemFromCart } from './cartSlice';
import { useDispatch } from 'react-redux';

export default function DeleteItemBtn({pizzaId}) {

  const dispatch = useDispatch();

  function handleDeleteCartItem(){
    dispatch(removeItemFromCart(pizzaId));
  }

  return (
    <Button onClick={handleDeleteCartItem}  size="small"> Delete</Button>
    )
}
