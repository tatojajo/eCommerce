import { isAuthenticated } from '../../Helpers/Auth/isAuthenticated';
import ajax from '../../Helpers/Services/ajax';
const { userToken } = isAuthenticated();

export const getProductList = (searchValue: string = '', page_number = 0) => {
  return ajax.post('products', {
    keyword: searchValue,
    page_size: 20,
    page_number: page_number
  });
};
export const getAllBrands = () => ajax.get('brands');

export const editProductInfo = (product: ProductItem) =>
  ajax.put(`product/${product.id}`, product, {
    headers: {
      Authorization: userToken
    }
  });

export const deleteProduct = (product: ProductItem | null) =>
  ajax.delete(`product/${product!.id}`, {
    headers: {
      Authorization: userToken
    }
  });

export const addNewProduct = (product: ProductItem) =>
  ajax.post('product', product, {
    headers: {
      Authorization: userToken
    }
  });
