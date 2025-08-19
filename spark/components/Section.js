
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
}) {
  const handleCardClick = (postId) => {
    setActiveCards((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === postId ? null : postId,
    }));
  };

  return (
    <>
      <h2 className="sectionTitle">{title}</h2>
      <div className="section">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`card ${activeCards[sectionId] === post.id ? "active" : ""}`}
            onClick={() => handleCardClick(post.id)}
          >
            <img src={post.imageUrl} alt="" className="cardImg" />
            <div className="cardInfoWrapper">
              <p className="cardDisc">$ {post.description}</p>
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

        {/** Custom Add Card **/}
        <div
          className={`card ${
            activeCards[sectionId] === `custom${sectionId}` ? "active" : ""
          }`}
          key={`custom${sectionId}`}
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
      </div>
    </>
  );
}
