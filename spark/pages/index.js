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


  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
  }, []);

  const handleLogin = () => {
    const email = prompt('Enter admin email:');
    const pwd = prompt('Enter password:');
    signInWithEmailAndPassword(auth, email, pwd).catch(() => alert('Login failed'));
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const toggleDetails = () => {
    setDetailsView(!detailsView);
    document.querySelectorAll('.cardInfoWrapper')
    .forEach(element => {
    element.style.display = detailsView ? 'none' : 'flex';
    });

    document.querySelectorAll('.card')
    .forEach(element => {
      element.style.height = detailsView ? '20vh' : '25vh';
    });
  }

  

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{color: '#eee'}}>Price Calculator</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => toggleDetails()}>Show/Hide Details</button>
          {!isAdmin && (
            <button onClick={handleLogin}>Admin Login</button>
          )}
          {isAdmin && (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </header>

      {showForm && isAdmin && (
        <div style={{ marginBottom: 24 }}>
          <PostForm
            existing={editing}
            onDone={() => { setShowForm(false); setEditing(null); }}
          />
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