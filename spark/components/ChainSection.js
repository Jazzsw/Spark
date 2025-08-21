export default function ChainSection({
    sectionId,
    title,
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
    handleCardClick
}){
    const customChainClick = (sectionId, name, val) => {
        handleCardClick(sectionId, name)

        setCustomValue({ ...CustomValue, [sectionId]: val })

    }

    return(
        <>  
            {sectionId === 6 && (
            <>
                <h2 className="sectionTitle">Chain Type</h2>
                <div className={`section ${type === "image" ? "imageSection" : "textSection"}`} style={{ display: isAdmin ? "flex" : "" }}>
                <div className={`card ${activeCards[sectionId] === 'customBrass1' ? "active" : ""} ${type === "image" ? "imageCard" : "textCard"}`} key={'customBrass1'} onClick={() => handleCardClick(sectionId, 'customBrass1')} style={{width: '50vw'}}>
                    <h2 className="cardText">Brass Finished</h2>
                </div>
                <div className={`card ${activeCards[sectionId] === 'customBrass2' ? "active" : ""} ${type === "image" ? "imageCard" : "textCard"}`} key={'customBrass2'} onClick={() => handleCardClick(sectionId, 'customBrass2')} style={{width: '50vw'}}>
                    <h2 className="cardText">Solid Brass</h2>
                </div>
                </div>
            </>
            )}

            {sectionId === 7 && (
                <>
                    <h2 className="sectionTitle">{title}</h2>
                    <div className={`section ${type === "image" ? "imageSection" : "textSection"}`} style={{ display: isAdmin ? "flex" : "" }}>
                        <div className={`card ${activeCards[sectionId] === 'customChain1' ? "active" : ""} ${type === "image" ? "imageCard" : "textCard"}`} key={'customChain1'} onClick={() => customChainClick(sectionId, 'customChain1', '120')} style={{width: '50vw'}}>
                            <h2 className="cardText">Unfinished</h2>
                        </div>
                        <div className={`card ${activeCards[sectionId] === 'customChain2' ? "active" : ""} ${type === "image" ? "imageCard" : "textCard"}`} key={'customChain2'} onClick={() => customChainClick(sectionId, 'customChain2', '195')} style={{width: '50vw'}}>
                            <h2 className="cardText">Custom Finished</h2>
                        </div>
                    </div>
                </>
            )}
            
        </>
    )
}