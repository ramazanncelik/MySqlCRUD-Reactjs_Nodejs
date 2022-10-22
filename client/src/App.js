import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [products, setProducts] = useState([]);
  const [newDescription, setNewDescription] = useState('')

  function SubmitProduct() {
    axios.post('http://localhost:3001/api/insert', {
      name: name,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    setProducts([...products, {
      name: name,
      price: price,
      imageUrl: imageUrl,
      description: description
    }])
    setName('');
    setPrice('');
    setImageUrl('');
    setDescription('');
  }

  function getProducts() {
    axios.get(`http://localhost:3001/api/get`).then((result) => {
      setProducts(result.data);
    });
  }

  function deleteProduct(productName) {
    axios.delete(`http://localhost:3001/api/delete/${productName}`)
  }

  function updateProduct(namee, descriptionn) {
    axios.put(`http://localhost:3001/api/update`, {
      name: namee,
      description: newDescription
    })
  }

  useEffect(() => {

    getProducts()

  }, []);


  return (
    <div style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', display: 'grid', gap: 10 }}>

      <h1>First Fulstack(Reactjs, Mysql, Nodejs) Proje</h1>

      <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', gap: 10 }}>
        <label>Name</label>
        <input style={{ width: '50%', padding: '0.50%' }} type='text' value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', gap: 10 }}>
        <label>Price</label>
        <input style={{ width: '50%', padding: '0.50%' }} type='text' value={price} onChange={e => setPrice(e.target.value)} />
      </div>

      <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', gap: 10 }}>
        <label>ImageUrl</label>
        <input style={{ width: '50%', padding: '0.50%' }} type='text' value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      </div>

      <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', gap: 10 }}>
        <label>Description</label>
        <input style={{ width: '50%', padding: '0.50%' }} type='text' value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <button onClick={() => SubmitProduct()}>Submit</button>

      {
        products.map(product => {
          return (
            <div style={{ userSelect: 'none' }} key={product.id}>
              <div>{product.id}</div>
              <div>{product.name}</div>
              <div>{product.price} TL</div>
              <div>{product.imageUrl}</div>
              <div style={{ maxWidth: '100%', marginRight: 5 }}>{product.description}</div>
              <div>
                <button onClick={() => deleteProduct(product.name)}>Delete</button>
                <input type='text' value={newDescription} onChange={e => setNewDescription(e.target.value)} />
                <button onClick={() => updateProduct(product.name)}>Update</button>
              </div>
            </div>
          )
        })
      }

    </div>
  );

}

export default App;