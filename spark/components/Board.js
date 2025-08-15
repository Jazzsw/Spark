// pages/board.js
import { act, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import PostForm from '../components/PostForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeCards, setActiveCards] = useState({});
  const [labourFee, setLabourFee] = useState('');
  const [showForm, setShowForm] = useState(false);



  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsub();
  }, [auth]);

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'posts'));
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    await deleteDoc(doc(db, 'posts', postId));
    fetchPosts();
  };

  const handleCardClick = (section, postId) => {
    setActiveCards((prev) => ({
      ...prev,
      [section]: prev[section] === postId ? null : postId
    }));
  };


  const handleLinkClick = (link) => {
    window.open(link, '_blank');
  };

  const totalPrice = 
    (parseFloat(posts.find(post => post.section === 1 && activeCards[1] === post.id)?.description) || 0) +
    (parseFloat(posts.find(post => post.section === 2 && activeCards[2] === post.id)?.description) || 0) +
    (parseFloat(posts.find(post => post.section === 3 && activeCards[3] === post.id)?.description) || 0) +
    (parseFloat(labourFee) || 0);  

  return (
    
    <div className='boardContainer'>
      {/* {isAdmin && (
          <>
          <div className='fullContainer'>
          <div className="addCardButton" onClick={() => { if(!showForm){setShowForm(true)} else{ setShowForm(false) }}}>
            <img src='https://i.imgur.com/9gOxvN1_d.png?maxwidth=520&shape=thumb&fidelity=high' alt="Add" className='addCardIcon' style={showForm ? {transform: 'rotate(45deg)'} : {}}></img>
          </div>
          {showForm && (
            <PostForm
              existing={selectedPost}
              onSave={() => {
                setSelectedPost(null);
                fetchPosts();
              }}
            />
          )}
          </div>
          </>
        )} */}

        {isAdmin && (
          <PostForm
            existing={selectedPost}
            onSave={() => {
              setSelectedPost(null);
              fetchPosts();
            }}
          />
        )}

      <h2 className='sectionTitle'>Section 1</h2>
      <div className="section">
        {posts
          .filter((post) => post.section === 1)
          .map((post) => (
            <div key={post.id} className={`card ${activeCards[1] === post.id ? 'active' : ''}`}
              onClick={() => handleCardClick(1, post.id)}>

              <img src={post.imageUrl} alt="" className='cardImg' />

              <div className='cardInfoWrapper'>
                <p className='cardDisc'>$ {post.description}</p>
                <button className='linkButton' onClick={() => handleLinkClick(post.link)}>Link</button>
              </div>

              {isAdmin && (
                <div className="buttonContainer">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="cardDelete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

      </div>

      <h2 className='sectionTitle'>Section 2</h2>
      <div className="section">
        {posts
          .filter((post) => post.section === 2)
          .map((post) => (
            <div key={post.id} className={`card ${activeCards[2] === post.id ? 'active' : ''}`}
              onClick={() => handleCardClick(2, post.id)}>

              <img src={post.imageUrl} alt="" className='cardImg' />
              <div className='cardInfoWrapper'>
                <p className='cardDisc'>$ {post.description}</p>
                <button className='linkButton' onClick={() => handleLinkClick(post.link)}>Link</button>
              </div>

              {isAdmin && (
                <div className="buttonContainer">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="cardDelete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

        {/* {isAdmin && (
          <PostForm
            existing={selectedPost}
            onSave={() => {
              setSelectedPost(null);
              fetchPosts();
            }}
          />
        )} */}
      </div>

      <h2 className='sectionTitle'>Section 3</h2>
      <div className="section">
        {posts
          .filter((post) => post.section === 3)
          .map((post) => (
            <div key={post.id} className={`card ${activeCards[3] === post.id ? 'active' : ''}`} onClick={() => handleCardClick(3, post.id)}>

              <img src={post.imageUrl} alt="" className='cardImg' />
              <div className='cardInfoWrapper'>
                <p className='cardDisc'>$ {post.description}</p>
                <button className='linkButton' onClick={() => handleLinkClick(post.link)}>Link</button>
              </div>

              {isAdmin && (
                <div className="buttonContainer">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="cardDelete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

        {/* {isAdmin && (
          <PostForm existing={selectedPost}
            onSave={() => {
              setSelectedPost(null);
              fetchPosts();
            }} />
        )} */}
      </div>

      

    { !isAdmin && (
      <>
      <div className='labourFeeContainer'>
        <h2 className='labourFeeTitle'>Labour Fee</h2>
        <input type="text" placeholder="$" className='inputFee' id='labourFee' value={labourFee}
          onChange={(e) => setLabourFee(e.target.value)} />
      </div>


    <div className='stickyFooter'>
      <div className='resetContainer'>
        <button className='resetButton' onClick={() => {
          setActiveCards({});
          setLabourFee('');
        }}>Reset</button>
      </div>

      <div>
        <div className='totalContainer'>
          <p className='totalTitle'>Total </p>
          <h1 className='totalPrice' id='totalPrice'>${totalPrice.toFixed(2)}
          </h1>
        </div>
      </div>
      
    </div>
    </>
    )}

    </div>
    
  );
}
