import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)
const Home = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 50000])
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resperpage, filteredProductsCount } = useSelector(state => state.products)
    const { keyword } = useParams();
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Fashion',
        'Home',
        'Mobiles',
        'Electronics',
        'Essentials',
        'Book, Toys',
        'Grocery',
        'Appliances',
        'Food'
    ]
    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, price, category, rating));
        if (error) {
            alert.error(error)
        }
    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])
    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }
    let count = productsCount;
    if(keyword) {
        count = filteredProductsCount
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className='col-6 col-md-3 mt-5 mb-5'>
                                        <div className='px-5'>
                                            <Range
                                                marks={{
                                                    1: `₹1`,
                                                    50000: `₹50000`
                                                }}
                                                min={1}
                                                max={50000}
                                                defaultValue={[1, 50000]}
                                                tipFormatter={value => `₹${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}

                                            />

                                            <hr className='my-5' />

                                            <div className='mt-5'>
                                                <h4 className='mb-3'>
                                                    Categories
                                                </h4>

                                                <ul className='pl-0'>
                                                    {categories.map(category => (
                                                        <li
                                                        style={{cursor: 'pointer',
                                                        listStyle: 'none'}}
                                                        key={category}
                                                        onClick={() => setCategory(category)}> 
                                                        {category}  
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className='my-3' />

                                            <div className='mt-5'>
                                                <h4 className='mb-3'>
                                                    Ratings
                                                </h4>

                                                <ul className='pl-0'>
                                                    {[5,4,3,2,1].map(star => (
                                                        <li
                                                        style={{cursor: 'pointer',
                                                        listStyle: 'none'}}
                                                        key={star}
                                                        onClick={() => setRating(star)}> 
                                                        <div className='rating-outer'>
                                                            <div className='rating-inner'
                                                            style={{
                                                                width: `${star * 20}%`
                                                            }}>

                                                            </div>
                                                            </div>  
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {products && products.map(product => (
                                        <Product key={product._id} product={product} col={4} />
                                    ))}
                                    <div className='col-6 col-md-9'>

                                    </div>
                                </Fragment>
                            ) : (
                                products && products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}

                        </div>
                    </section>
                    {resperpage <= count && (<div className='d-flex justify-content-center mt-5'>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resperpage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                    )}
                </Fragment>
            )
            }
        </Fragment>

    )
}

export default Home
