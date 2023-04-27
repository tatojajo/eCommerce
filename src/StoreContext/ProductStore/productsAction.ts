export const SET_PRODUCTS = 'SET_PRODUCTS'

export const NEXT_PAGE = 'NEXT_PAGE'

export const SET_SLIDER_IMAGES = 'SET_SLIDER_IMAGES'

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";

export const INCREMENT_PRODUCT_QUANTITY = "INCREMENT_PRODUCT_QUANTITY";

export const DECREMENT_PRODUCT_QUANTITY = "DECREMENT_PRODUCT_QUANTITY";

export const CHANGE_THEME = "CHANGE_THEME";

export const nextPage = (products,totalProducts)=>({
  type: NEXT_PAGE,
  products,
  totalProducts
})

export const setProductsState = (products, totalProducts)=>({
  type: SET_PRODUCTS,
  products,
  totalProducts
})

export const setSliderImages = (products)=>({
  type: SET_SLIDER_IMAGES,
  products
})

export const addItemToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  product,
});

export const removeProductFromCart = (product) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  product,
});

export const incrementProductQiantity = (product) => ({
  type: INCREMENT_PRODUCT_QUANTITY,
  product,
});

export const decrementProductQuantity = (product) => ({
  type: DECREMENT_PRODUCT_QUANTITY,
  product,
});

// export const changeTheme = ()=>({
//     type: CHANGE_THEME
// })

