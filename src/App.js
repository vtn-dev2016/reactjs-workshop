import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Button, message } from 'antd'
import AddProduct from './component/addProduct'
import AddStock from './component/addStock'
import ProductList from './component/productList'
import config from './config'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stockList: [],
      productForm: false,
      stockForm: false,
      editProduct: null
    }
  }

  componentDidMount() {
    this.getProductLists()
  }

  setEdit = (editProduct) => {
    this.setState({ editProduct, productForm: true })
  }

  handleShowFrom = (props) => {
    this.setState({ ...props })
  }

  getProductLists = async () => {
    try {
      const res = await fetch(`${config.rootUrl}stocks`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        method: 'GET',
      })
      const { stockList, success, message } = await res.json()
      if (success) {
        this.setState({ stockList })
      } else {
        message.error(message);
      }
    } catch (error) {
      message.error('มีบางอย่างผิดพลาดกรุณาลองใหม่');
    }
  }

  render() {
    return (
      <div className={'App'}>
        <AddProduct
          {...this.state}
          handleShowFrom={this.handleShowFrom}
          getProductLists={this.getProductLists}
        />
        <AddStock
          {...this.state}
          handleShowFrom={this.handleShowFrom}
          getProductLists={this.getProductLists}
        />
        <div style={{ padding: 16 }}>
          <Button type="dashed" onClick={() => this.handleShowFrom({ productForm: true })}>เพิ่มสินค้า</Button>
          {"  "}
          <Button type="dashed" onClick={() => this.handleShowFrom({ stockForm: true })}>เพิ่มสต๊อค</Button>
        </div>
        <ProductList setEdit={this.setEdit} data={this.state.stockList} handleShowFrom={this.handleShowFrom}  />
      </div>
    );
  }
}

export default App;
