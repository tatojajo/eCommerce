import ajax from "../../../Helpers/Services/ajax";


export const getAllProductsForAdmin = (page_number = 0) =>
  ajax.post("products", {
    keyword: "",
    page_size: 20,
    page_number: page_number,
  });