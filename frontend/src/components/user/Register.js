import React, { useEffect, useState, Fragment } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layouts/MetaData'
import { useNavigate } from 'react-router-dom'
import { register, clearErrors } from '../../actions/authActions'

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png');

    const alert = useAlert();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            Navigate('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, Navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData();


        formdata.append('name', name);
        formdata.append('email', email);
        formdata.append('password', password);
        formdata.append('avatar', avatar);

        dispatch(register(formdata))

    }
    const onChange = e => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {

                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {

            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    return (
        <Fragment>
            <MetaData title={'Register User'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input type="name"
                                id="name_field"
                                className="form-control"
                                name="name"
                                onChange={onChange}
                                value={name} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                onChange={onChange}
                                value={email} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input type="password" id="password_field" className="form-control" name="password"
                                onChange={onChange}
                                value={password} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img src={avatarPreview}
                                            className='rounded-circle' alt='Avatar Preview' />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='iamges/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button id="register_button" type="submit" className="btn btn-block py-3" disabled={loading ? true : false}>
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register
