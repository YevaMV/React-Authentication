import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  // const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);
  const enteredInputRef = useRef();
  const enteredinputPassword = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = enteredInputRef.current.value;
    const enteredPassword = enteredinputPassword.current.value;

    // const enteredEmailHasError = enteredEmail.trim() === '';
    // const enteredPasswordHasError = enteredPassword.trim().length !== 6;

    // if (enteredEmailHasError) {
    //   setEnteredEmailIsValid(false);
    // }

    // if (enteredPasswordHasError) {
    //   setEnteredPasswordIsValid(false);
    // }

    // if (enteredEmailHasError && enteredPasswordHasError) {
    //   setEnteredEmailIsValid(false);
    //   setEnteredPasswordIsValid(false);
    // }

    setIsLoading(true);
    if (isLogin) {
    } else {
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9f03aHqsbHidtAYGISQnjcTEtYwDda0M',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          header: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          //..
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            alert(errorMessage);
          });
        }
      });
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={enteredInputRef} />
          {/* {!enteredEmailIsValid && (
            <p className="error-text">Email can not be empty</p>
          )} */}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={enteredinputPassword} />
          {/* {!enteredPasswordIsValid && (
            <p className="error-text">
              Please enter a valid Password(6 charachters long)!
            </p>
          )} */}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
