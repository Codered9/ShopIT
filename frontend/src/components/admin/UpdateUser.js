import React, { useEffect, useState, Fragment } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layouts/MetaData'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser,getUserDetails, clearErrors } from '../../actions/authActions'
import { UPDATE_USER_RESET } from '../../constants/authConstants'
import Sidebar from './Sidebar'
const UpdateUser = () => {
    const [name, setName] = useState('');
    const params = useParams();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const alert = useAlert();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { user } = useSelector(state => state.userDetails);
    const { error, isUpdated } = useSelector(state => state.user)
    const userId = params.id;
    useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success('Updated Successfully!')
            Navigate('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, Navigate, error, isUpdated, user, userId])

    const submitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData();


        formdata.append('name', name);
        formdata.append('email', email);
        formdata.append('role', role);

        dispatch(updateUser(user._id, formdata))

    }
    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" onSubmit={submitHandler}>
                                    <h1 className="mt-2 mb-5">Update User</h1>

                                    <div className="form-group">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                            type="name"
                                            id="name_field"
                                            className="form-control"
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="role_field">Role</label>

                                        <select
                                            id="role_field"
                                            className="form-control"
                                            name='role'
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                                </form>
                            </div>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    );
};

export default UpdateUser;
