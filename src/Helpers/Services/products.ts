import ajax from "./ajax";

export const getAllProducts = (page_number = 0) => ajax.post("products",{
  keyword:'',
  page_size:20,
  page_number:page_number
});
export const productsNextpage = ( startingIndex: number ) => ajax.post("products",{
  keyword:'',
  page_size:20,
  page_number:startingIndex 
});


export const deleteProduct = (productId: number) =>
  ajax.delete(`products/${productId}`);

export const getSearchedProducts = (value: number) =>
  ajax.get(`products/search?q=${value}`);

export const getProductsCategories = () => ajax.get("products/categories");
