import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {
  constructor(){
    super();
   this.state =  {
    products : [
        {
            price : 9999,
            title : 'Mobile Phone',
            qty : 1,
            img : 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww',
            id : 1,
        },
        {
            price : 50000,
            title : 'Camera',
            qty : 1,
            img : 'https://plus.unsplash.com/premium_photo-1667538960104-25726d82a6e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            id : 2,
        },
        {
            price : 999,
            title : 'Earbud',
            qty : 1,
            img : 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFyYnVkfGVufDB8fDB8fHww',
            id : 3,
        }
    ]};
   };

   handleIncreaseQuantity = (product) => {
        
    const {products} = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;
    console.log('need to increase the quantity ', products[index].qty);
    this.setState({
        products:products
    })
   };
   handleDecreaseQuantity = (product) => {
    
    const {products} = this.state;
    const index = products.indexOf(product);
    if(products[index].qty === 0) {return};
    products[index].qty -= 1;
    console.log('need to decrease the quantity ', products[index].qty);
    this.setState({
        products:products
    })
   };

   handleDeleteProduct = (id) => {
    const {products} = this.state;
// used to filter the items from the product
    const items = products.filter((item) => item.id !== id);
     this.setState ({
        products : items
     })
   };

   getCartCount = (product) => {
    const{products} = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
   };

   getCartTotal = (product) => {
    const{products} = this.state;
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.qty;
    });
    return total;
   };

  render(){
    const {products} = this.state;
    return (
      <div className="App">
        <Navbar count = {this.getCartCount()}/>
        <h1> Cart </h1>
        <Cart
        products = {products}
       onIncreaseQuantity = {this.handleIncreaseQuantity}
       onDecreaseQuantity = {this.handleDecreaseQuantity}
       onDeleteProduct = {this.handleDeleteProduct}
        />
        <div style = {{fontSize:20, padding :10}}> Total : {this.getCartTotal() } </div>
     
   </div>
        )
    }
}
  
  
export default App;
