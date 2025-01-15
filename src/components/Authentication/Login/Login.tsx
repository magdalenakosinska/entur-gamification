import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    setAuthing(true);
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(response.user.uid);
      navigate('/');
    } catch (error) {
      console.log(error);
      setAuthing(false);
    }
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError('');
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user.uid);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
      setAuthing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightPane}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}>Login</h3>
            <p className={styles.subtitle}>Please enter your details.</p>
          </div>

          <div className={styles.form}>
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
          </div>

          <button
            className={styles.button}
            onClick={signInWithEmail}
            disabled={authing}>
            Log In With Email and Password
          </button>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.dividerWrapper}>
            <div className={styles.divider}></div>
            <p className={styles.dividerText}>OR</p>
          </div>

          <button
            className={`${styles.button} ${styles.googleButton}`}
            onClick={signInWithGoogle}
            disabled={authing}>
            Log In With Google
          </button>
        </div>

        <div className={styles.footer}>
          <p className={styles.signUpLink}>
            Don't have an account?{' '}
            <span>
              <a href="/signup">Sign Up</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;