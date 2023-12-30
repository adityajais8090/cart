import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import './firebaseConfig';
import { getFirestore, collection, getDocs, onSnapshot, addDoc, doc, updateDoc, deleteDoc, where, query } from 'firebase/firestore';

class App extends React.Component {
  constructor(){
    super();
   this.state =  {
    loading : true,
    products : [],
    formData: {
      title: '',
      price: '',
      qty: '',
      img: '',
    },
   };
   
   };

// define componentDidMount ..............
   componentDidMount() {
    const db = getFirestore();
    const queryRef = collection(db, "price");

//fetch data from database .........
    getDocs(collection(db, 'products'))
    .then ((snapshot)=> {
      console.log(snapshot);

      // const queryRef = collection(db, "price");
      // query(queryRef, where("price", "<=", 5000));

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
         data['id'] = doc.id;
        return data;
      })
      this.setState ({
        products: products,
        loading : false
      })
    });

    // add listener to product collection change............
    onSnapshot(collection(db, 'products'),  ((snapshot)=> {

      console.log(snapshot);

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
         data['id'] = doc.id;
        return data;
      })
      this.setState ({
        products: products,
        loading : false
      })
    }));

   }

   addProduct = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { formData } = this.state;
    const db = getFirestore();
    addDoc(collection(db, 'products'), formData)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };


  


   handleIncreaseQuantity = (product) => {
    const {products} = this.state;
    const db = getFirestore();
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // console.log('need to increase the quantity ', products[index].qty);
  //   this.setState({
  //       products:products
  //   })
  //  };
//Update the component and store it in firebase
const productRef = doc(db, 'products', products[index].id);
           
            updateDoc(productRef, {
                qty: products[index].qty + 1,
              })
                .then(() => {
                  console.log('Updated Successfully');
                })
                .catch((error) => {
                  console.log('Error:', error);
                });
            };

   handleDecreaseQuantity = (product) => {
    const {products} = this.state;
    const db = getFirestore();
    const index = products.indexOf(product);
    
const productRef = doc(db, 'products', products[index].id);
           
            updateDoc(productRef, {
                qty: products[index].qty - 1,
              })
                .then(() => {
                  console.log('Updated Successfully');
                })
                .catch((error) => {
                  console.log('Error:', error);
                });
    
   };

   handleDeleteProduct = (id) => {
    const db = getFirestore();
    deleteDoc(doc(db, 'products', id));
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


   // handle the form data 
   handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert values to numbers for "price" and "qty"
    const numericValue = name === 'price' || name === 'qty' ? parseFloat(value) : value;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: numericValue,
      },
    }));
  };

  render(){
    const {products, loading} = this.state;

  
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
        {loading && <h1> Loading Products... </h1>}
        <div style = {{fontSize:20, padding :10}}> Total : {this.getCartTotal() } </div>

        <div> <h2>  Add your Product  </h2> </div>
        <form style={{ padding: 20, margin: 20 }} onSubmit={this.addProduct}>
            <label id="title">Title : </label>
            <input type="text" name="title" id="title" placeholder="Title" onChange={this.handleInputChange} />

           <br/>
           <br/>

            <label id="price">Price : </label>
            <input type="number" name="price"  id="price" placeholder="Price" onChange={this.handleInputChange} />

            <br/>
           <br/>

            <label id="qty">Quantity : </label>
            <input type="number" name="qty"  id="qty" placeholder="Quantity"  onChange={this.handleInputChange}/>

            <br/>
           <br/>

            <label id="img">Image URL : </label>
            <input type="text" name="img"  id="img" placeholder="Image URL"  onChange={this.handleInputChange}/>
            <br/>
            <br/>
            <button type = "submit" style = {{padding:10, fontSize:20}} > Add a Product </button>
            
        </form>

   </div>
        )
    }
}
export default App;
