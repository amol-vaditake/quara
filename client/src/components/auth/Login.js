import React, { useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

function  Login () {
  let [state,setState] = useState({
      email: "",
      password: "",
      errors: {}
    })
		const auth = useSelector(state => state.auth)
		let navigate = useNavigate()
		const dispatch = useDispatch()
		

  function goToTheRoute(route) {
    navigate(route)
  }
	if(auth.isAuthenticated){
		goToTheRoute('/')
	}

  function onChange (e) {
    setState({ [e.target.id]: e.target.value });
  };

  function onSubmit (e) {
    e.preventDefault();

    const userData = {
      email: state.email,
      password: state.password
    };
		
   dispatch(loginUser(userData));
  };



    const { errors } = state;

    return (
      <div className="container">
        <div className="row">
          <div style={{marginTop:"8rem"}} className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                {/* Don't have an account? <Link to="/register">Register</Link> */}
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.email}
                  error={errors?.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors?.email || errors?.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors?.email}
                  {errors?.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.password}
                  error={errors?.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors?.password || errors?.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors?.password}
                  {errors?.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


export default Login