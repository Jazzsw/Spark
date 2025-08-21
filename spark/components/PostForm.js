import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Board, setShowForm } from '../components/Board';

export default function PostForm({ existing, onSave, addSection, setAddSection, row3, finishes}) {
  const [description, setDescription] = useState('');
  const [chainDescription, setChainDescription] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [section, setSection] = useState('');
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [val, setVal] = useState('');

  useEffect(() => {
    if (existing) {
      setDescription(existing.description || '');
      setImageUrl(existing.imageUrl || '');
      setSection(existing.section || '');
      setLink(existing.link || '');
      setText(existing.text || '');
      setChainDescription(existing.chainDescription || '');
      setSelectedFinishes(existing.finishes || []);
      setVal(existing.value || '');
    }
  }, [existing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      if (existing?.id) {
        // Editing an existing post
        await updateDoc(doc(db, 'posts', existing.id), {
          description,
          imageUrl,
          section: parseInt(section),
          link,
          text,
          value: val,
          chainDescription,
          finishes: selectedFinishes,
        });
      } else {
        // Creating a new post
        await addDoc(collection(db, 'posts'), {
          description,
          imageUrl,
          section: parseInt(section),
          createdAt: new Date(),
          link,
          text,
          value: val,
          chainDescription,
          finishes: selectedFinishes,
        });
      }

      setDescription('');
      setImageUrl('');
      setSection('');
      setLink('');
      setSelectedFinishes([]);
      setText('');
      setChainDescription('');
      setVal('');
      onSave?.();
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Error saving post. Check console for details.');
    }

    setLoading(false);
  };

  // const finishes = [
  //   {name: 'Brass', val: 'B'},
  //   {name: 'Polished Brass', val: 'PB'},
  //   {name: 'Satin Brass', val: 'SB'},
  //   {name: 'Antique Brass', val: 'AB'},
  //   {name: 'Polished Nickel', val: 'PN'},
  //   {name: 'Satin Nickel', val: 'SN'},
  //   {name: 'Black', val: 'BK'},
  // ];

  return (
    <>
    <form onSubmit={handleSubmit} className="addCard">
      <h2>{existing?.id ? 'Update Card' : 'Create A Card'}</h2>

      {!existing?.id && (<h2>What Would You like to Add?</h2>)}
      
      <div style={{display: 'flex'}}>
      <select className='selectOption' value={addSection} onChange={(e) => setAddSection(e.target.value)}>
        <option value=''>Select</option>
        <option value='1'>Canopy</option>
        <option value='2'>Connection Length</option>
        <option value='3'>Fitter Size</option>
        <option value='4'>Fitter Profile</option>
        <option value='5'>Finish</option>
      </select>

      {existing?.id && (
        <button className='escBtn' onClick={() => {setAddSection('')}}>Exit Editing</button>
      )}
      </div>

      {addSection === '1' && (
        <>
          <div className='addSection'>
            <div className='addContainer'>
              <div className='inputs'>
                <h2 className='addText'>Add Canopy Info</h2>
                <input className='inputBox' type="text" placeholder="Canopy Rod Price" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input className='inputBox' type="text" placeholder="Canopy Chain Price" value={chainDescription} onChange={(e) => setChainDescription(e.target.value)} />
                <input className='inputBox' type="text" placeholder="Canopy Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <input className='inputBox'type="text" placeholder="Canopy Link" value={link} onChange={(e) => setLink(e.target.value)} />
              </div>

              <div className='inputButtons'>
                <h2 className='addText'>Available Finishes</h2>
                {finishes.map((fin) => (
                  <div key={fin.value} className="finishOption">
                    <input
                      type="checkbox"
                      id={`finish-${fin.value}`}
                      name="finishes"
                      value={fin.value}
                      checked={selectedFinishes.includes(fin.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFinishes([...selectedFinishes, fin.value]);
                        } else {
                          setSelectedFinishes(selectedFinishes.filter(f => f !== fin.value));
                        }
                      }}
                    />
                    <label htmlFor={`finish-${fin.value}`}>{fin.text}</label>
                  </div>
                ))}
              </div>

            </div>

            <button type="submit" disabled={loading} className="submitButton" onClick={() => setSection(1)}>
              {loading ? 'Saving...' : existing?.id ? 'Update Card' : 'Create Card'}
            </button>

          </div>
        </>
      )}
      {addSection === '2' && (
        <>
          <div className='addSection'>
            <div className='addContainer'>
              <div className='inputs'>
                <h2 className='addText'>Add Connection Length</h2>
                <input className='inputBox' type="text" placeholder="Connection Rod Price" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input className='inputBox' type="text" placeholder="Connection Chain Price" value={chainDescription} onChange={(e) => setChainDescription(e.target.value)} />
                <input className='inputBox' type="text" placeholder="Connection Text" value={text} onChange={(e) => setText(e.target.value)} />
                <input className='inputBox'type="text" placeholder="Connection Link" value={link} onChange={(e) => setLink(e.target.value)} />
              </div>

              <div className='inputButtons'>
                <h2 className='addText'>Available Finishes</h2>
                {finishes.map((fin) => (
                  <div key={fin.value} className="finishOption">
                    <input
                      type="checkbox"
                      id={`finish-${fin.value}`}
                      name="finishes"
                      value={fin.value}
                      checked={selectedFinishes.includes(fin.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFinishes([...selectedFinishes, fin.value]);
                        } else {
                          setSelectedFinishes(selectedFinishes.filter(f => f !== fin.value));
                        }
                      }}
                    />
                    <label htmlFor={`finish-${fin.value}`}>{fin.text}</label>
                  </div>
                ))}
              </div>

            </div>

            <button type="submit" disabled={loading} className="submitButton" onClick={() => setSection(2)}>
              {loading ? 'Saving...' : existing?.id ? 'Update Card' : 'Create Card'}
            </button>

          </div>
        </>
      )}
      {addSection === '3' && (
        <>
          <div className='addSection'>
            <div className='addContainer'>
              <h2 className='addText'>Add Fitter Size</h2>
              <div className='inputs' style={{ display: 'flex', flexDirection: 'row'}}>
                <input className='inputBox' type="text" placeholder="Size" value={text} onChange={(e) => setText(e.target.value)} />
              </div>

            </div>

            <button type="submit" disabled={loading} className="submitButton" onClick={() => setSection(3)}>
              {loading ? 'Saving...' : existing?.id ? 'Update Card' : 'Create Card'}
            </button>

          </div>
        </>
      )}
      {addSection === '4' && (
        <>
          <div className='addSection'>

          </div>
        </>
      )}
      {addSection === '5' && (
        <>
          <div className='addSection'>
            <div className='addContainer'>
              <h2 className='addText'>Add Finish</h2>
              <div className='inputs' style={{ display: 'flex', flexDirection: 'row'}}>
                <input className='inputBox' type="text" placeholder="Finish Name" value={text} onChange={(e) => setText(e.target.value)} />
                <input className='inputBox' type="text" placeholder="Finish Shortform" value={val} onChange={(e) => setVal(e.target.value)} />
              </div>

            </div>

            <button type="submit" disabled={loading} className="submitButton" onClick={() => setSection(5)}>
              {loading ? 'Saving...' : existing?.id ? 'Update Card' : 'Create Card'}
            </button>

          </div>
        </>
      )}

    </form>

    </>
  );
 
}
