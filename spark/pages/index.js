import dynamic from 'next/dynamic';
import { useState, useEffect, use } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebaseClient';

const PostForm = dynamic(() => import('../components/PostForm'), { ssr: false });
const Board = dynamic(() => import('../components/Board'), { ssr: false });


export default function Home() {
  const auth = getAuth(app);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [detailsView, setDetailsView] = useState(false);
  const [loginView, setLoginView] = useState(false);
  


  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
  }, []);

  const handleLogin = () => {
    // const email = prompt('Enter admin email:');
    // const pwd = prompt('Enter password:');
    const email = document.getElementById('emailBox').value;
    const pwd = document.getElementById('passwordBox').value;

    if (!email || !pwd) {
      alert('Please enter both email and password.');
      return;
    }
    signInWithEmailAndPassword(auth, email, pwd).catch(() => alert('Login failed'));
    setLoginView(false);
    document.getElementById('emailBox').value = '';
    document.getElementById('passwordBox').value = '';
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const toggleDetails = () => {
    setDetailsView(!detailsView);
    document.querySelectorAll('.cardInfoWrapper')
    .forEach(element => {
    // element.style.display = detailsView ? 'none' : 'flex';
    element.style.height = detailsView ? '0px' : '2em';
    });

    document.querySelectorAll('.cardImg')
    .forEach(element => {
      element.style.height = detailsView ? '15em' : '13em';
    });

    document.querySelectorAll('.cardText').forEach(element => {
      element.style.fontSize = detailsView ? '' : '1.8em';
      element.style.height = detailsView ? '' : '1.5em';
    });
    document.querySelectorAll('.cardText.finishText').forEach(element => {  
      element.style.fontSize = detailsView ? '' : '1.2em';
      element.style.textAlign = detailsView ? '' : 'none';
      element.style.height = detailsView ? '' : '1.5em';
    });
  }

  const listenForEnter = () => {
    document.getElementById('passwordBox').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleLogin();
      }
    });
  };


  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <div className="header"></div>
      <header style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: 24 }}>
       <h1 className='title'>Lumen</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="toggleDetailsButton" onClick={() => toggleDetails()}> 
          <h2 className='shDetails'> { detailsView ? 'Hide Details' : 'Show Details' } </h2>
          <img src={detailsView ? 'https://i.imgur.com/dexYLQq.png' : 'https://i.imgur.com/a6Zrbuw.png'} className='toggleDetailsIcon' alt="Toggle Details" />
          </div>

         {!isAdmin && (
          <>
          <div className='loginContainer'>
            <button className="adminLoginButton" style= {loginView ? {border: '1px solid #ff4d4d', backgroundColor: '#1E1E1E'} : {}} onClick={() => setLoginView(!loginView)}>{loginView ? 'Cancel' : 'Login To Edit'}</button>
              {loginView && (
                <>
                  <div className='loginBlock'>
                    <h2 className='adminLoginText'>Admin Login</h2>
                    <input id='emailBox' className='loginInput' type="email" placeholder="Email" />
                    <input id='passwordBox' className='loginInput' type="password" placeholder="Password" onClick={() => listenForEnter()}/>
                    <button className='loginButton' onClick={handleLogin}>Login</button>
                  </div>
                </>
              )}
            </div>
            </>
          )}

          {isAdmin && (
            <>
              <button className="adminLogoutButton" onClick={handleLogout}>Exit Edit Mode</button>
            </>
          )}

        </div>
      </header>

      {showForm && isAdmin && (
        <div style={{ marginBottom: 24 }}>
          <PostForm existing={editing} onDone={() => { setShowForm(false); setEditing(null); }} />
        </div>
      )}

      <Board
        onEdit={(post) => {
          if (!isAdmin) return alert('Admin only');
          setEditing(post);
          setShowForm(true);
        }}
      />

    </div>
  );
}