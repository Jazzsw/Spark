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
    setAddSection,
}) {
  const handleCardClick = (postId) => {
    const isCurrentlyActive = activeCards[sectionId] === postId;
    const newActive = isCurrentlyActive ? null : postId;

    setActiveCards((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === postId ? null : postId,
    }));

    if (sectionId === 3) {
        if (newActive === null) {
            setShowFitter(false);
            document.getElementById('section-4').style.display = "none";
            document.getElementById('section-4-title').style.display = "none";
        } else {
            const selectedPost = posts.find(post => post.id === postId);
            setSec4Array(selectedPost?.children || []);
            setShowFitter(true);
            document.getElementById('section-4').style.display = "flex";
            document.getElementById('section-4-title').style.display = "flex";
            document.getElementById('section-4-title').style.flexDirection = "column";
        }
    }
};

  return (
    <>
      <h2 id={`section-${sectionId}-title`} className={`sectionTitle ${showFitter ? "fitterTitle" : ""}`} style={{ display: isAdmin ? "flex" : "" }}>{title}</h2>
      <div id={`section-${sectionId}`} className={`section ${type === "image" ? "imageSection" : "textSection"} ${showFitter ? "fitterSection" : ""}`} style={{ display: isAdmin ? "flex" : "" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={`card ${activeCards[sectionId] === post.id ? "active" : ""} ${type === "image" ? "imageCard" : "textCard"}`}
            onClick={() => handleCardClick(post.id)}
          >

            {type === "image" ? (
              <img src={post.imageUrl} alt="" className="cardImg" />
            ) : (
              <div id="sec5" className={`cardText ${sectionId === 5 ? "finishText" : ""}`}>{post.text}</div>
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
                  className={`cardDelete ${type === "text" ? "textDelete" : ""} ${sectionId === 5 ? "finishDelete" : ""}`}
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddSection(sectionId.toString() || '');
                    onEdit(post);
                    window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                    });
                  }}
                  className={`editButton ${type === "text" ? "textEditButton" : ""} ${sectionId === 5 ? "finishEditButton" : ""}`}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}


        {hasCustom && (
            <div className={`card ${activeCards[sectionId] === `custom${sectionId}` ? "active" : ""} ${type === "image" ? "imageCard" : "textCard"} ${'customPriceCard'}`} key={`custom${sectionId}`}
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
