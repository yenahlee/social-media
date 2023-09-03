import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth'

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const signUserOut = async () => {
        await signOut(auth);
        navigate('/login')
    }

    return <div>
        <div className='navbar'>
            <div className="links">
                <Link to="/" className='home-link'> Home </Link>
                {user && (<Link to="/todo" className='todo-link'> Todo </Link>)}
                {!user ? (<Link to="/login" className='login-link'> Login </Link> ): (<Link to="/createpost" className='create-link'> Create Post </Link>)}
            </div>
            <div className='user'>
            {user && (
                <>
                    <p> {auth.currentUser?.displayName}</p>
                    <img src={auth.currentUser?.photoURL || ""} width="20" height="20" />
                    <button onClick={signUserOut}> Log Out </button>
                </>
            )}
        </div>
        </div>
    </div>
}

