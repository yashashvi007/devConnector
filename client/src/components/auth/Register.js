import React, { Fragment , useState } from 'react';
import {Link , Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from './../../actions/alert'
import {register} from './../../actions/auth'
import PropTypes from 'prop-types'

const Register = (props) => {
    const [formData , setFormData] = useState({
        name: '',
        email:'',
        password: '',
        password2 : ''
    })

    const {name , email , password , password2} = formData;


    const onChange = e => setFormData({...formData , [e.target.name] : e.target.value})

    const onSubmit =async e => {
        e.preventDefault();
        if(password!==password2){
            props.setAlert('password is wrong' , 'danger')
        }else{
            
            props.register({name , email , password})
        }
    }

    if(props.isAuthenticated){
      return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
             <h1 className="large text-primary">
        Sign Up
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)} >
        <div className="form-group">
          <input type="text" name='name' value={name} placeholder="Name" onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" name='email' value={email} onChange={e=>onChange(e)} placeholder="Email Address" required />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input type="password" name='password' value={password} onChange={e=>onChange(e)} placeholder="Password" minLength='6' />
        </div>
        <div className="form-group">
          <input type="password" name='password2' value={password2} onChange={e=>onChange(e)} placeholder="Confirm Password" minLength='6' />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    )
}

Register.propTypes = {
  setAlert : PropTypes.func.isRequired
};

const mapStatetoProps = (state)=>({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStatetoProps , {setAlert , register} )(Register)
