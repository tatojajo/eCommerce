import ajax from './ajax';

export const getAllProducts = (page_number = 0) =>
  ajax.post('products', {
    keyword: '',
    page_size: 12,
    page_number: page_number
  });
export const productsNextpage = (startingIndex: number) =>
  ajax.post('products', {
    keyword: '',
    page_size: 12,
    page_number: startingIndex
  });

export const getSearchedProducts = (value: string) =>
  ajax.post('products', {
    keyword: value,
    page_size: 5,
    page_number: 0
  });

export const getSearchedProductsNextPage = (value: string, page_number: number) =>
  ajax.post('products', {
    keyword: value,
    page_size: 5,
    page_number: page_number
  });

export const selectedBrandProducts = (brandName: string, item: string = '') =>
  ajax.post('products', {
    keyword: item,
    filter: { brand: brandName },
    page_size: 7,
    page_number: 0
  });

export const getFilteredProducts = (category: string, brandName: string = '') =>
  ajax.post('products', {
    keyword: category,
    filter: { brand: brandName },
    page_size: 10,
    page_number: 0
  });
