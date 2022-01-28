import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
const UpdateProduct = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [oldImages, setOldImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, isUpdated, error: updateError } = useSelector(state => state.newProduct);
    const { error, product } = useSelector(state => state.productDetails)
    const productId = params.id;
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

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock);
            setOldImages(product.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate('/admin/products')
            alert.success('Product updated successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, error, alert, isUpdated, navigate, updateError, product, productId]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData();


        formdata.append('name', name);
        formdata.append('price', price);
        formdata.append('description', description);
        formdata.append('category', category);
        formdata.append('stock', stock);
        formdata.append('seller', seller);

        images.forEach(image => {
            formdata.append('images', image)
        })

        dispatch(updateProduct(product._id, formdata))

    }
    const onChange = e => {

        const files = Array.from(e.target.files);
        setImagePreview([]);
        setImages([]);
        setOldImages([]);

        files.forEach(file => {

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {

                    setImagePreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)

        })
    }
    return (<Fragment>
         <MetaData title={'Update Product'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5">
                        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                            <h1 className="mb-4">Update Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>

                                    {categories.map(category => (

                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    value={seller}
                                    onChange={(e) => setSeller(e.target.value)}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {oldImages && oldImages.map(img => (
                                    <img src={img} key={img} alt={name} className="mt-3 mt-2" width="55" height="55" />
    ))}
                                {imagePreview.map(img => (
                                    <img src={img} key={img} alt={name} className="mt-3 mt-2" width="55" height="55" />
                                ))}
                            </div>


                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                UPDATE
                            </button>

                        </form>
                    </div>

                </Fragment>
            </div>
        </div>


    </Fragment>);
};

export default UpdateProduct;
