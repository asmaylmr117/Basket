
import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch() {
    const [data, setData] = useState('')
    useEffect((() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => {
        const updatedProducts = response.data.map((prod, index) => {
        const discountValue =
          topProductPercentages[Math.floor(Math.random()*10)];
        const finalPrice = discountValue
          ? (prod.price * (1 - discountValue / 100)).toFixed(2)
          : prod.price.toFixed(2);

        return {
          ...prod,
          inStock: true,
          discount: discountValue,
          finalPrice,
        };
      });
      setData(updatedProducts);
    })}), [])

    return [data, setData];
}


//  useEffect(() => {
//     axios.get("https://fakestoreapi.com/products").then((response) => {
//       const updatedProducts = response.data.map((prod, index) => {
//         const discountValue =
//           topProductPercentages[Math.floor(Math.random()*10)];
//         const finalPrice = discountValue
//           ? (prod.price * (1 - discountValue / 100)).toFixed(2)
//           : prod.price.toFixed(2);

//         return {
//           ...prod,
//           inStock: true,
//           discount: discountValue,
//           finalPrice,
//         };
//       });
//       setShopProducts(updatedProducts);
//     });
//   }, []);