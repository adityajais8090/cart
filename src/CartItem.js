import React from 'react';

class CartItem extends React.Component{
   

    render(){
        console.log('this.props', this.props.product);
        const { title, price, qty, id } = this.props.product;
        const {
            product, 
            increaseQuantity, 
            decreaseQuantity, 
            deleteProduct
          } = this.props;
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
                <div style = {{color :'#777'}}>Key : {id}</div>
                <div className='cart-item-actions'>

                <img className='action-icons' 
                alt='increase' 
                src = 'https://cdn-icons-png.flaticon.com/128/992/992651.png'
                onClick = {()=> increaseQuantity(product)}
                />
                <img className='action-icons' 
                alt='decrease' 
                src = 'https://cdn-icons-png.flaticon.com/128/1828/1828906.png'
                onClick = {()=> decreaseQuantity(product)}
                />
                <img className='action-icons' 
                alt='delete' 
                src = 'https://cdn-icons-png.flaticon.com/128/1214/1214428.png'
                onClick = {()=> deleteProduct(product.id)}
                />

                    </div>
                </div>
            </div>
        );
    }
}
    
  const styles = {
    image: {
        height:110,
        widht:110,
        borderRadius:4,
    }
  }




export default CartItem;