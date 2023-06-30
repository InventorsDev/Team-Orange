import './signUp.css';
import brain from '../Assets/brain-icon.svg';
import google from '../Assets/google.svg';
import apple from '../Assets/apple.svg';
import { Link } from 'react-router-dom';

function SignUp () {
    return (

        <div className='Sg--page'>

            <div className='braindiv'>
                <img src={brain} alt='Brain' />
                <div className='brandCont'><p className='brand'>Tranquil</p></div>
                <h1>Welcome</h1>
                <p>Have a better Mindful Experience</p>
            </div>

            <div className='LogSn'>  
            <div className='Sn-circle'></div>
              <div className='allsnlg'>
                    

                    <button className='auths'>
                        <div className='small-circs'><img src={google} alt=''/></div>
                        <div  className='google-apple'>
                        <p>Login with Google</p>
                        </div>
                    </button>

                    <button className='auths'>
                        <div className='small-circs'><img src={apple} alt=''/></div>
                        <div className='google-apple'>
                        <p>Login with Apple</p>
                        </div>
                    </button>

                    <p className='or'>or</p>

                    <button className='auths last'>Sign in</button>

                    <p className='neg-accnt'>Don't have an account ? <br/><Link to='/getStarted' className='span'>Sign Up</Link></p>

              </div>

            </div>
        </div>
    )
}

export default SignUp ;