// components/itemCard.js
import React from 'react';

export default function itemCard({ item, onEdit }){
  return (
    <div style={{ width: 260, border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>

      <div style={{ width: '100%', height: 180, background: '#f6f6f6' }}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.description} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
      </div>

      <div style={{ padding: 8 }}>
        <p style={{ minHeight: 40 }}>{item.description}</p>
      </div>

    </div>
  );
}