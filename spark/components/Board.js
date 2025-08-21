// pages/board.js
import { act, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import PostForm from '../components/PostForm';
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
  const [connection, setConnection] = useState('Connection');
  const [showFitter, setShowFitter] = useState(false);
  const [sec4Array, setSec4Array] = useState([]);

  const [addSection, setAddSection] = useState('');



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

  const getPrice = (post, section) => {
  if (!post) return 0;
  if (connection === "Rod") {
    return parseFloat(post.description) || 0;
  } else if (connection === "Chain") {
    return parseFloat(post.chainDescription) || 0;
  }
  return 0;
};

const totalPrice =
  getPrice(posts.find(post => post.section === 1 && activeCards[1] === post.id), 1) +
  getPrice(posts.find(post => post.section === 2 && activeCards[2] === post.id), 2) +
  getPrice(posts.find(post => post.section === 3 && activeCards[3] === post.id), 3) +
  (parseFloat(labourFee) || 0) +
  (activeCards[1] === 'custom1' ? (parseFloat(CustomValue[1]) || 0) : 0) +
  (activeCards[2] === 'custom2' ? (parseFloat(CustomValue[2]) || 0) : 0) +
  (activeCards[3] === 'custom3' ? (parseFloat(CustomValue[3]) || 0) : 0);


  return (
    
    <div className='boardContainer'>

        {isAdmin && (
          <PostForm
            addSection={addSection}
            setAddSection={setAddSection}
            existing={selectedPost}
            row3={posts.filter((p) => p.section === 3)}
            finishes={posts.filter((p) => p.section === 5)}
            onSave={() => {
              setSelectedPost(null);
              fetchPosts();
            }}
          />
        )}

        <h2 className='sectionTitle' style={{ display: isAdmin ? "" : "flex" }}>Connection Type</h2>
        <div className='connectionSelector'>  
          <div className={`connectionButton ${connection === 'Rod' ? 'active' : ''}`} onClick={() => connection==='Rod' ? setConnection('Connection') : setConnection('Rod')}><h2 className='connectionLabel'>Rod</h2></div>
          <div className={`connectionButton ${connection === 'Chain' ? 'active' : ''}`} onClick={() => connection==='Chain' ? setConnection('Connection') : setConnection('Chain')}><h2 className='connectionLabel'>Chain</h2></div>
        </div>
      
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
        type="image"
        hasCustom={true}
        connection={connection}
        showFitter={showFitter}
        setShowFitter={setShowFitter}
        setSec4Array={setSec4Array}
        setAddSection={setAddSection}
      />

      <Section
        sectionId={2}
        title={`${connection} Length ${connection === 'Rod' ? '(All rod is 3/4" dia)' : connection === 'Chain' ? '(Chain is 7 Gauge (3/16" thick) Elongated links (1" x 2-1/4")' : ''}`}
        posts={posts.filter((p) => p.section === 2).sort((a, b) => a.text.localeCompare(b.text))}
        activeCards={activeCards}
        setActiveCards={setActiveCards}
        CustomValue={CustomValue}
        setCustomValue={setCustomValue}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={(post) => setSelectedPost(post)}
        onLinkClick={handleLinkClick}
        type="text"
        hasCustom={true}
        connection={connection}
        showFitter={showFitter}
        setShowFitter={setShowFitter}
        setSec4Array={setSec4Array}
        setAddSection={setAddSection}
      />
      
      <Section
        sectionId={3}
        title="Fitter Size"
        posts={posts.filter((p) => p.section === 3).sort((a, b) => a.text.localeCompare(b.text))}
        activeCards={activeCards}
        setActiveCards={setActiveCards}
        CustomValue={CustomValue}
        setCustomValue={setCustomValue}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={(post) => setSelectedPost(post)}
        onLinkClick={handleLinkClick}
        type="text"
        hasCustom={true}
        connection={connection}
        showFitter={showFitter}
        setShowFitter={setShowFitter}
        setSec4Array={setSec4Array}
        setAddSection={setAddSection}
      />  

      <Section
        sectionId={4}
        title="Fitter Profile"
        posts={posts.filter((p) => p.section === 4 && (!isAdmin ? sec4Array.includes(p.profileID) : true))}
        activeCards={activeCards}
        setActiveCards={setActiveCards}
        CustomValue={CustomValue}
        setCustomValue={setCustomValue}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={(post) => setSelectedPost(post)}
        onLinkClick={handleLinkClick}
        type="image"
        hasCustom={true}
        connection={connection}
        showFitter={showFitter}
        setShowFitter={setShowFitter}
        setSec4Array={setSec4Array}
        setAddSection={setAddSection}
      />

      <Section
        sectionId={5}
        title="Finish"
        posts={posts.filter((p) => p.section === 5)}
        activeCards={activeCards}
        setActiveCards={setActiveCards}
        CustomValue={CustomValue}
        setCustomValue={setCustomValue}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onEdit={(post) => setSelectedPost(post)}
        onLinkClick={handleLinkClick}
        type="Text"
        hasCustom={true}
        connection={connection}
        showFitter={showFitter}
        setShowFitter={setShowFitter}
        setSec4Array={setSec4Array}
        setAddSection={setAddSection}
      />
      
    { !isAdmin && (
      <>
      <div className='labourFeeContainer'>
        <h2 className='labourFeeTitle'>Additional Fees</h2>
        <input type="text" placeholder="$" className='inputFee' id='labourFee' value={labourFee}
          onChange={(e) => setLabourFee(e.target.value)} />
      </div>

    <div className='stickyFooterShadow'></div>

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
