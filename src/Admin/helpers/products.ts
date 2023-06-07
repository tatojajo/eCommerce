import ajax from "../../Helpers/Services/ajax";

export const getProductList = (searchValue: string = "", page_number = 0) => {
  if (searchValue === "") page_number = 0;
  return ajax.post("products", {
    keyword: searchValue,
    page_size: 20,
    page_number: page_number,
  });
};
