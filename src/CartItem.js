import React from 'react';

const CartItem = (props) => {

        console.log('props', props.product);
        const { title, price, qty } = props.product;
        const {
            product, 
            onIncreaseQuantity, 
            onDecreaseQuantity, 
            onDeleteProduct
          } = props;
        return(
            
        <div className='cart-item'>
            <div className='left-block'>
            <img src= {product.img}
            alt="Product Imag" style={styles.image} />  
                </div>
            <div className='right-block'>
                <div style={ {fontSize : 25} }>{title}</div>
                <div style = {{color :'#777'}}>Rs {price}</div>
                <div style = {{color :'#777'}}>Qty : {qty}</div>
                <div className='cart-item-actions'>

                <img className='action-icons' 
                alt='increase' 
                src = 'https://cdn-icons-png.flaticon.com/128/992/992651.png'
                onClick = {()=> onIncreaseQuantity(product)}
                />
                <img className='action-icons' 
                alt='decrease' 
                src = 'https://cdn-icons-png.flaticon.com/128/1828/1828906.png'
                onClick = {()=> onDecreaseQuantity(product)}
                />
                <img className='action-icons' 
                alt='delete' 
                src = 'https://cdn-icons-png.flaticon.com/128/1214/1214428.png'
                onClick = {()=> onDeleteProduct(product.id)}
                />

                    </div>
                </div>
            </div>
        );
    }
    
  const styles = {
    image: {
        height:110,
        widht:110,
        borderRadius:4,
    }
  }


export default CartItem;