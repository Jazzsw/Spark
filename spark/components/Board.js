// pages/board.js
import { act, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import PostForm from '../components/PostForm';
import CustomAdd from '../components/CustomAdd';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Section from "../components/Section";

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
      
        <Section
        sectionId={1}
        title="Canopy"
        posts={posts.filter((p) => p.section === 1)}
        activeCards={activeCards}
        setActiveCards={setActiveCards}
        CustomValue={CustomValue}
        setCustomValue={setCustomValue}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={(post) => setSelectedPost(post)}
        onLinkClick={handleLinkClick}
      />

      <Section
        sectionId={2}
        title="Section 2"
        posts={posts.filter((p) => p.section === 2)}
        activeCards={activeCards}
        setActiveCards={setActiveCards}
        CustomValue={CustomValue}
        setCustomValue={setCustomValue}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={(post) => setSelectedPost(post)}
        onLinkClick={handleLinkClick}
      />

      <Section
        sectionId={3}
        title="Section 3"
        posts={posts.filter((p) => p.section === 3)}
        activeCards={activeCards}
        setActiveCards={setActiveCards}
        CustomValue={CustomValue}
        setCustomValue={setCustomValue}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={(post) => setSelectedPost(post)}
        onLinkClick={handleLinkClick}
      />
      
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
