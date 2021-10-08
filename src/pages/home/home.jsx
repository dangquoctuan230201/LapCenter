import "./home.scss";
import React, { useState, useEffect } from "react";
import { Icon, Input, Segment,Pagination } from "semantic-ui-react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import product from "../../assets/data/product";
const axios = require("axios");

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url) => {
    // await setData(product);
    // start call API

    setLoading(true);
    await axios
      .get(url)
      .then(function (response) {
        setPageNumber(1)
        setTotalPage(response.data.totalPage)
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
   
  };
  
  useEffect(async () => {
    let url = `https://lap-center.herokuapp.com/api/product`;
    await fetchData(url);
  }, []);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = async () => {
    
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${price}`;
    await fetchData(url);
  };

  const onSearchBrand = async (e) => {
    setBrand(e.target.value); //set brand = e.target.value
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${e.target.value}&orderByColumn=price&orderByDirection=${price}`;
    await fetchData(url);
    
  };

  const sortPrice = async (e) => {
    setPrice(e.target.value);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${e.target.value}`;
    await fetchData(url);

    
  };
  const handlePaginationChange = async (e, { activePage }) => {
    await setLoading(true);
    await setPageNumber(activePage);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${price}&pageSize=12&pageNumber=${activePage}`;
    await axios
      .get(url)
      .then(function (response) {
        // handle success
        setData(response.data.products);
        setTotalPage(response.data.totalPage);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
    

  return (
    <div className="home-container">
      <Navbar />
      <div className="filter">
        <div className="search">
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
        </div>
        <div className="selectForm">
          {/* <p>Hãng</p> */}
          <select className="selectBox" value={brand} onChange={onSearchBrand}>
            <option selected value="">
              Tất cả
            </option>
            <option value="Asus">ASUS</option>
            <option value="Dell">DELL</option>
            <option value="Acer">ACER</option>
            <option value="Lenovo">LENOVO</option>
          </select>
        </div>
        <div className="selectForm">
          {/* <p>Giá</p> */}
          <select className="selectBox" value={price} onChange={sortPrice}>
            <option selected value="">
              Tất cả
            </option>
            <option value="asc">Từ thấp đến cao</option>
            <option value="desc">Từ cao đến thấp</option>
          </select>
        </div>
      </div>
      <div className="container-body">
        <div className="menuLeft">
        </div>

        <Segment loading={loading} className="product">
          {data.length === 0 ?
            <div className="noResults">
              <h1 style={{ textAlign: "center" }}>
                không tìm thấy kết quả nào!
              </h1>
            </div>
           : 
            data.map((item) => <Card product={item} />
          )}
        </Segment>
        <div className="menuRight"></div>
      </div>
      <div className="pagination">
        <Pagination 
         boundaryRange={0}
        //  defaultActivePage={1}
        activePage={pageNumber}
         ellipsisItem={true}
         firstItem={true}
         lastItem={true}
         siblingRange={1}
         totalPages={totalPages}
         onPageChange={handlePaginationChange} />
      </div>
      
        <Footer/>;
      
    </div>
  );
}

export default Home;
