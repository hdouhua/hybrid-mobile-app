import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import ProductRow from './ProductRow';

enum RequestStatus {
  IDLE = 'IDEL',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}
interface Product {
  id: string;
  name: string;
  price: number;
  count: number;
}
type Products = Product[];

export default function ProductTable() {
  const [products, setProducts] = useState<Products>([]);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.IDLE,
  );
  const total = products.reduce(
    (sum, current) => sum + current.count * current.price,
    0,
  );

  useEffect(() => {
    setRequestStatus(RequestStatus.PENDING);

    fetch('https://6250e1d0e3e5d24b3427ff30.mockapi.io/api/v1/products')
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          setRequestStatus(RequestStatus.SUCCESS);
          return res.json();
        }
        setRequestStatus(RequestStatus.ERROR);
        return [];
      })
      .then((data: Products) => {
        setProducts(data);
      })
      .catch(err => {
        console.log(err);
        setRequestStatus(RequestStatus.ERROR);
        setProducts([]);
      });

    return () => {
      //
    };
  }, []);

  const getUpdatedProducts = (product: Product) => {
    const newProducts = [...products];
    for (let index = 0; index < newProducts.length; index++) {
      if (newProducts[index].id === product.id) {
        newProducts[index] = product;
      }
    }
    return newProducts;
  };
  const handleIncrement = (product: Product) => {
    console.log('increment');
    const newProduct: Product = {...product, count: product.count + 1};
    setProducts(getUpdatedProducts(newProduct));
  };
  const handleDecrement = (product: Product) => {
    console.log('decrement');
    const newProduct: Product = {...product, count: product.count - 1};
    setProducts(getUpdatedProducts(newProduct));
  };

  if (requestStatus === RequestStatus.ERROR) {
    return <Text>网络出错了</Text>;
  }
  if (requestStatus === RequestStatus.PENDING) {
    return <Text>加载中...</Text>;
  }

  return (
    <View style={{marginTop: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 1, fontWeight: 'bold'}}>名称</Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>价格</Text>
        <Text style={{width: 50, fontWeight: 'bold'}}>数量</Text>
      </View>
      {products.map(product => (
        <ProductRow
          product={product}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          key={product.name}
        />
      ))}
      <Text style={{marginTop: 30, fontWeight: 'bold', textAlign: 'center'}}>
        总价: {total}
      </Text>
    </View>
  );
}
