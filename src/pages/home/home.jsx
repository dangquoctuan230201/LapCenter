import "./home.scss";
import React, { useState, useEffect } from "react";
import { Icon, Input, Segment } from "semantic-ui-react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/card/card";
import product from "../../assets/data/product";
const axios = require("axios");

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(true)

  const fetchData = async (url) => {
    // await setData(product);
    // start call API
    
    setLoading(true);
    await axios.get(url)
      .then(function (response) {
        // handle success
        console.log(response.data.products);
       
         setData(response.data.products);
         setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoading(false);
      })
      .then(function () {
        // always executed
      });
    //end call API
    // fetch('https://lap-center.herokuapp.com/api/product')
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   setData(data.products)
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  };
  useEffect(async () => {
    let url = `https://lap-center.herokuapp.com/api/product`;
    await fetchData(url);
  }, []);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = async() => {
    // setLoading(true);
    // await axios.get(`https://lap-center.herokuapp.com/api/product?productName=${search}`)
    //   .then(function (response) {
    //     // handle success
    //     console.log('search asus: ',response.data.products);
       
    //      setData(response.data.products);
    //      setLoading(false);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //     setLoading(false);
    //   })
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${price}`;
    await fetchData(url); 
  };

  const onSearchBrand = async(e) => {
    setBrand(e.target.value); //set brand = e.target.value
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${e.target.value}&orderByColumn=price&orderByDirection=${price}`;
    await fetchData(url); 
    // setLoading(true);
    // await axios.get(`https://lap-center.herokuapp.com/api/product?productBrand=${e.target.value}`)
    //   .then(function (response) {
    //     // handle success
    //     console.log('search asus: ',response.data.products);
       
    //      setData(response.data.products);
    //      setLoading(false);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //     setLoading(false);
    //   })

  };

  const sortPrice = async(e) => {
    setPrice(e.target.value);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${e.target.value}`;
    await fetchData(url); 
    
      // setLoading(true);
      // await axios.get(`https://lap-center.herokuapp.com/api/product?orderByColumn=price&orderByDirection=${e.target.value}`)
      // .then(function (response) {
      //   // handle success
      //   console.log(response.data.products);
       
      //    setData(response.data.products);
      //    setLoading(false);
      // })
      // .catch(function (error) {
      //   // handle error
      //   console.log(error);
      //   setLoading(false);
      // });
    
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="menuLeft">
        <Input
          icon={
            <Icon
              name="search"
              inverted
              circular
              link
              onClick={onSubmitSearch}
            />
          }
          placeholder="Search..."
          value={search}
          onChange={onChangeSearch}
        />
        <div className="selectForm">
          <p>Hãng</p>
          <select className="selectBox" value={brand} onChange={onSearchBrand}>
            <option selected value=""></option>
            <option value="Asus">ASUS</option>
            <option value="Dell">DELL</option>
            <option value="Acer">ACER</option>
            <option value="Lenovo">LENOVO</option>
          </select>
        </div>
        <div className="selectForm">
          <p>Giá</p>
          <select className="selectBox" value={price} onChange={sortPrice}>
            <option selected value=""></option>
            <option value="asc">Từ thấp đến cao</option>
            <option value="desc">Từ cao đến thấp</option>
          </select>
        </div>
      </div>
      <Segment loading={loading} className="product">
        {data.map((item) => (
          <Card product={item} />
        ))}
      </Segment>
      <div className="menuRight"></div>
    </div>
  );
}

export default Home;
