import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const navigate = useNavigate();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAh7CrGjATeyccm4Yw8dTpxNd4ZdS6aN0', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assumption: Always succeeds!

      navigate('/', { replace: true });
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>Trip type</label>
        <select>
          <option value="car">Car trip</option>
          <option value="bike">Bike ride</option>
        </select>
        {/* <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} /> */}
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>Trip preferences</label>
        <select>
          <option value="ride">Free ride</option>
          <option value="training">Training</option>
        </select>
        {/* <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} /> */}
      </div>
      <div className={classes.action}>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default ProfileForm;
