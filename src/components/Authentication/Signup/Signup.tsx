import { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';


const Signup = () => {

const auth = getAuth();
const navigate  = useNavigate();

const [authing, setAuthing] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');
    
const signUpWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider()) 
    .then(response => {
        console.log(response.user.uid);
        navigate('/');
    })
    .catch(error => {
        console.log(error); 
        setAuthing(false);
    }
    )
};

const signUpWithEmail = async () => {

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    setAuthing(true);
    setError('');

    createUserWithEmailAndPassword(auth, email, password)
    .then(response => {
        console.log(response.user.uid);
        navigate('/');
    })
    .catch(error => {
        console.log(error);
        setError((error as Error).message);
        setAuthing(false);
    })
}

  return (
    <div className={styles.container}>
  <div className={styles.rightPane}>
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Sign Up</h3>
        <p className={styles.subtitle}>Welcome! Please enter your information below to begin.</p>
      </div>

      <div className={styles.formWrapper}>
        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Re-Enter Password"
          className={styles.inputField}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <button
        onClick={signUpWithEmail}
        disabled={authing}
        className={styles.button}
      >
        Sign Up With Email and Password
      </button>

      <div className={styles.dividerWrapper}>
        <div className={styles.divider}></div>
        <p className={styles.dividerText}>OR</p>
      </div>

      <button
        onClick={signUpWithGoogle}
        disabled={authing}
        className={styles.button}
      >
        Sign Up With Google
      </button>
    </div>

    <div className={styles.footer}>
      <p className={styles.signUpLink}>
        Already have an account?{' '}
        <span>
          <a href="/login">Log In</a>
        </span>
      </p>
    </div>
  </div>
</div>
  )
}

export default Signup
