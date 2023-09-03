import { auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        const result = signInWithPopup(auth, provider)
        console.log(result)
        navigate('/')
    }
    return (
        <div className='login-div'>
            <p> Sign in with Google to continue </p>
            <button onClick={signInWithGoogle} className='google'> Sign in with Google </button>
        </div>
    )
}
