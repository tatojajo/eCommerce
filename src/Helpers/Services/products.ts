import ajax from './ajax';

export const getAllProducts = (page_size: number, page_number = 0) =>
  ajax.post('products', {
    keyword: '',
    page_size: page_size,
    page_number: page_number
  });
export const productsNextpage = (page_size: number, page_number: number) =>
  ajax.post('products', {
    keyword: '',
    page_size: page_size,
    page_number: page_number
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

export const selectedBrandProducts = (brand: string, category: string, startIndex: number) =>
  ajax.post('products', {
    keyword: category,
    filter: { brand: brand },
    page_size: 10,
    page_number: startIndex
  });

export const getFilteredProducts = (category: string, brandName: string = '') =>
  ajax.post('products', {
    keyword: category,
    filter: { brand: brandName },
    page_size: 15000,
    page_number: 0
  });
