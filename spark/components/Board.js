// pages/board.js
import { act, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import PostForm from '../components/PostForm';
import CustomAdd from '../components/CustomAdd';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeCards, setActiveCards] = useState({});
  const [labourFee, setLabourFee] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [CustomValue, setCustomValue] = useState({});



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
  (parseFloat(labourFee) || 0) +
  (activeCards[1] === 'custom1' ? (parseFloat(CustomValue[1]) || 0) : 0) +
  (activeCards[2] === 'custom2' ? (parseFloat(CustomValue[2]) || 0) : 0) +
  (activeCards[3] === 'custom3' ? (parseFloat(CustomValue[3]) || 0) : 0);


  return (
    
    <div className='boardContainer'>

        {isAdmin && (
          <PostForm
            existing={selectedPost}
            onSave={() => {
              setSelectedPost(null);
              fetchPosts();
            }}
          />
        )}

      <h2 className='sectionTitle'>Canopy</h2>
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
                  <button onClick={() => handleDelete(post.id)} className="cardDelete">
                    Delete
                  </button>

                  <button onClick={(e) => {e.stopPropagation(); setSelectedPost(post);}} className="editButton">
                    Edit
                  </button>
                  
                </div>
              )}
            </div>
          ))}


          {/** Custom Add Card **/}
          <div className={`card ${activeCards[1] === "custom1" ? 'active' : ''}`} key='custom1' onClick={() => handleCardClick(1, "custom1")}>
            <h2 className="addTitle">Custom Price</h2>
            <input
                type="text"
                placeholder="Custom Price"
                value={CustomValue[1] || ''}
                onChange={(e) => setCustomValue({ ...CustomValue, [1]: e.target.value })}
                className="customInputBox"
            />
          </div> 

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
                  <button onClick={() => handleDelete(post.id)} className="cardDelete">Delete</button>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedPost(post);}} className="editButton">Edit</button>
                </div>
              )}
            </div>
          ))}

        {/** Custom Add Card **/}
          <div className={`card ${activeCards[2] === "custom2" ? 'active' : ''}`} key='custom2' onClick={() => handleCardClick(2, "custom2")}>
            <h2 className="addTitle">Custom Price</h2>
            <input
                type="text"
                placeholder="Custom Price"
                value={CustomValue[2] || ''}
                onChange={(e) => setCustomValue({ ...CustomValue, [2]: e.target.value })}
                className="customInputBox"
            />
          </div> 
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
                  <button onClick={() => handleDelete(post.id)} className="cardDelete">Delete</button>

                  <button onClick={(e) => {e.stopPropagation(); setSelectedPost(post);}} className="editButton">Edit</button>
                </div>
              )}
            </div>
          ))}

        {/** Custom Add Card **/}
          <div className={`card ${activeCards[3] === "custom3" ? 'active' : ''}`} key='custom3' onClick={() => handleCardClick(3, "custom3")}>
            <h2 className="addTitle">Custom Price</h2>
            <input
                type="text"
                placeholder="Custom Price"
                value={CustomValue[3] || ''}
                onChange={(e) => setCustomValue({ ...CustomValue, [3]: e.target.value })}
                className="customInputBox"
            />
          </div> 
      </div>

      

    { !isAdmin && (
      <>
      <div className='labourFeeContainer'>
        <h2 className='labourFeeTitle'>Additional Fees</h2>
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
