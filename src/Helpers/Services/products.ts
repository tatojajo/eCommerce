import ajax from "./ajax";

export const getAllProducts = (page_number = 0) =>
  ajax.post("products", {
    keyword: "",
    page_size: 12,
    page_number: page_number,
  });
export const productsNextpage = (startingIndex: number) =>
  ajax.post("products", {
    keyword: "",
    page_size: 12,
    page_number: startingIndex,
  });

export const productInfo = (productId: number) =>
  ajax.post(`product/${productId}`);

export const getSearchedProducts = (value: string) =>
  ajax.post("products", { keyword: value, page_size: 12, page_number: 0 });

export const getSearchedProductsNextPage = (
  value: string,
  page_number: number
) =>
  ajax.post("products", {
    keyword: value,
    page_size: 12,
    page_number: page_number,
  });

// export const deleteProduct = (productId: number) =>
//   ajax.delete(`products/${productId}`);

// export const getProductsCategories = () => ajax.get("products/categories");
