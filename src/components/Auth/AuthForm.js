import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);
  const enteredInputRef = useRef();
  const enteredinputPassword = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = enteredInputRef.current.value;
    const enteredPassword = enteredinputPassword.current.value;

    const enteredEmailHasError = enteredEmail.trim() === '';
    const enteredPasswordHasError = enteredPassword.trim().length !== 6;

    if (enteredEmailHasError) {
      setEnteredEmailIsValid(false);
    }

    if (enteredPasswordHasError) {
      setEnteredPasswordIsValid(false);
    }

    if (enteredEmailHasError && enteredPasswordHasError) {
      setEnteredEmailIsValid(false);
      setEnteredPasswordIsValid(false);
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
          {!enteredEmailIsValid && (
            <p className="error-text">Email can not be empty</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={enteredinputPassword} />
          {!enteredPasswordIsValid && (
            <p className="error-text">
              Please enter a valid Password(6 charachters long)!
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
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
