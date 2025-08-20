export default function Section({
  sectionId,
  title,
  posts,
  activeCards,
  setActiveCards,
  CustomValue,
  setCustomValue,
  isAdmin,
  onDelete,
  onEdit,
  onLinkClick,
  type,
  hasCustom,
  connection,
  showFitter,
  setShowFitter,
    setSec4Array,
}) {
  const handleCardClick = (postId) => {
    setActiveCards((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === postId ? null : postId,
    }));

    if(sectionId === 3) {
        setSec4Array(posts.find(post => post.id === postId)?.children || []);
        setShowFitter(!showFitter);
        document.getElementById('section-4').style.display = showFitter ? "none" : "flex";
        document.getElementById('section-4-title').style.display = showFitter ? "none" : "flex";
    }
  };

  return (
    <>
      <h2 className="sectionTitle" id={`section-${sectionId}-title`}>{title}</h2>
      <div className={`section ${type === "image" ? "imageSection" : "textSection"}`} id={`section-${sectionId}`}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={`card ${activeCards[sectionId] === post.id ? "active" : ""} ${type === "image" ? "imageCard" : "textCard"}`}
            onClick={() => handleCardClick(post.id)}
          >

            {type === "image" ? (
              <img src={post.imageUrl} alt="" className="cardImg" />
            ) : (
              <div className="cardText">{post.text}</div>
            )}

            <div className="cardInfoWrapper">
              <p className="cardDisc">$ {connection === "Rod" ? post.description : connection === "Chain" ? post.chainDescription : "Select Connection"}</p>
              <button
                className="linkButton"
                onClick={(e) => {
                  e.stopPropagation();
                  onLinkClick(post.link);
                }}
              >
                Link
              </button>
            </div>

            {isAdmin && (
              <div className="buttonContainer">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(post.id);
                  }}
                  className="cardDelete"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(post);
                  }}
                  className="editButton"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}

        {hasCustom && (
            <div className={`card ${activeCards[sectionId] === `custom${sectionId}` ? "active" : ""} ${type === "image" ? "imageCard" : "textCard"}`} key={`custom${sectionId}`}
            onClick={() => handleCardClick(`custom${sectionId}`)}
            >

            <h2 className="addTitle">Custom Price</h2>
            <input
                type="text"
                placeholder="Custom Price"
                value={CustomValue[sectionId] || ""}
                onChange={(e) =>
                setCustomValue({ ...CustomValue, [sectionId]: e.target.value })
                }
                className="customInputBox"
            />
            </div>
        )}
      </div>
    </>
  );
}
