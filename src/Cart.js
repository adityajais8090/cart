import React from 'react';
import CartItem from './CartItem';


const Cart = (props) => {
    const {products} = props;
    const {onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct} = props;
    return(
        <div className ='cart'> 
        {products.map((product) => {
            return <CartItem 
            product = {product}
            id={product.id}
            increaseQuantity = {onIncreaseQuantity}
            decreaseQuantity = {onDecreaseQuantity}
            deleteProduct = {onDeleteProduct}
            />
        })} 
    
        </div>
    )
}

   
 export default Cart;