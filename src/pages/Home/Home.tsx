import React from 'react'

import ProductsContainer from '../../component/ProductsContainer'
import SignIn from '../SignIn'
import { bool, boolean } from 'yup'

const Home = ()=>{
    return(
        <div>
            <SignIn open={false}/>

            <ProductsContainer/></div>
    )
}

export default Home



