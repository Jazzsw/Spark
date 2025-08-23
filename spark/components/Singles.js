import { act, useEffect, useState } from 'react';

export default function Singles() {
    
    const [activeSingles, setActiveSingles] = useState({});


    const tempLocal = {
        '101-1': { postId: '101-1', section: 101}, // Flush
        '101-2': { postId: '101-2', section: 101}, // Semi-Flush

        'flush3-1/4brass': { postId: '105-1', price: '185'}, // Flush + 3-1/4" + Brass
        'flush3-1/4steel': { postId: '105-2', price: '35'}, // Flush + 4" + Steel

        'flush4brass': { postId: '105-3', price: '185'}, // Flush + 4" + Brass
        'flush4steel': { postId: '105-4', price: '40'}, // Flush + 4" + Steel

        'flush6brass': { postId: '105-5', price: '285'}, // Flush + 6" + Brass
        'flush6steel': { postId: '105-6', price: '40'}, // Flush + 6" + Steel

        'flush8brass': { postId: '105-4', price: '999999999'}, // Flush + 8" + Brass
        'flush8steel': { postId: '105-4', price: '60'}, // Flush + 8" + Steel

        'flush10brass': { postId: '105-5', price: '999999999'}, // Flush + 10" + Brass
        'flush10steel': { postId: '105-5', price: '75'}, // Flush + 10" + Steel


        'semi-flush4brass': { postId: '106-1', section: 106, BR: '165', AB: '175', AZ: '165', SB: '185', SK: '185', PN: '185', SN: '185'}, // Semi-Flush + 4" + Brass
        'semi-flush6brass': { postId: '106-2', section: 106, BR: '225', AB: '225', AZ: '225', SB: '225', SK: '225', PN: '240', SN: '185'}, // Semi-Flush + 6" + Brass

        'semi-flush4steel': { postId: '107-1', section: 107, price: '150'}, // Semi-Flush + 4" + Steel
        'semi-flush6steel': { postId: '107-2', section: 107, price: '165'}, // Semi-Flush + 6" + Steel
    }

    const finishSearchCodes = ['semi-flush4brassBR', 'semi-flush4brassAB', 'semi-flush4brassAZ', 'semi-flush4brassSB', 'semi-flush4brassSK', 'semi-flush4brassPN', 'semi-flush4brassSN',
                                'semi-flush6brassBR', 'semi-flush6brassAB', 'semi-flush6brassAZ', 'semi-flush6brassSB', 'semi-flush6brassSK', 'semi-flush6brassPN', 'semi-flush6brassSN',
    ];

    const semiFlushSizes = ['4"', '6"']

    const handleCardClick = (section, postId) => {
        setActiveSingles((prev) => ({
            ...prev,
            [section]: prev[section] === postId ? null : postId
        }));
    };

    const search = (activeSingles[101]+activeSingles[102]+activeSingles[103]+activeSingles[104]+activeSingles[105]+activeSingles[106]+activeSingles[107]).toString();
    let searchCode = search.replaceAll('undefined', '').replaceAll('null', '');
    
    console.log('activeSingles', searchCode);

    const getPrice = () => {
        if (finishSearchCodes.includes(searchCode)) {
            let finishCode = searchCode.slice(-2);
            searchCode = searchCode.slice(0, -2);
            return (tempLocal[searchCode][finishCode])
        }
        return (tempLocal[searchCode]?.price)
    };

    const returnPrice = getPrice();
    
    console.log('returnPrice', returnPrice);
    
    const totalPrice = returnPrice ? parseFloat(returnPrice || 0) : 0;

    return (
        <>
            <div className='singleSectionContainer'>
                <h2 className="sectionTitle">Profile</h2>
                <div className="section textSection singleSection">
                    <div className={`card textCard ${activeSingles[101] === 'flush' ? "active" : ""}`} onClick={() => handleCardClick(101, 'flush')}><h2 className="cardText">Flush</h2></div>
                    <div className={`card textCard ${activeSingles[101] === 'semi-flush' ? "active" : ""}`} onClick={() => handleCardClick(101, 'semi-flush')}><h2 className="cardText">Semi-Flush</h2></div>
                </div>

                <h2 className="sectionTitle">Size</h2>
                <div className="section textSection singleSection">
                    <div className={`card textCard ${activeSingles[102] === '3-1/2' ? "active" : ""}`} onClick={() => handleCardClick(102, '3-1/4')} style={activeSingles[101] === 'semi-flush' ? { display: 'none' } : {}}><h2 className="cardText">3-1/4"</h2></div> {/*if semi is selected this size is not available*/ }
                    <div className={`card textCard ${activeSingles[102] === '4' ? "active" : ""}`} onClick={() => handleCardClick(102, '4')}><h2 className="cardText">4"</h2></div>
                    <div className={`card textCard ${activeSingles[102] === '6' ? "active" : ""}`} onClick={() => handleCardClick(102, '6')}><h2 className="cardText">6"</h2></div>
                    <div className={`card textCard ${activeSingles[102] === '8' ? "active" : ""}`} onClick={() => handleCardClick(102, '8')} style={activeSingles[101] === 'semi-flush' ? { display: 'none' } : {}}><h2 className="cardText">8"</h2></div>{/*if semi is selected this size is not available*/ }
                    <div className={`card textCard ${activeSingles[102] === '10' ? "active" : ""}`} onClick={() => handleCardClick(102, '10')} style={activeSingles[101] === 'semi-flush' ? { display: 'none' } : {}}><h2 className="cardText">10"</h2></div>{/*if semi is selected this size is not available*/ }
                </div>

                <h2 className="sectionTitle">Material</h2>
                <div className="section textSection singleSection">
                    <div className={`card textCard ${activeSingles[103] === 'brass' ? "active" : ""}`} onClick={() => handleCardClick(103, 'brass')} style={(searchCode === 'flush8' || searchCode === 'flush10') ? { display: 'none' } : {}} ><h2 className="cardText">Brass</h2></div>
                    <div className={`card textCard ${activeSingles[103] === 'steel' ? "active" : ""}`} onClick={() => handleCardClick(103, 'steel')}><h2 className="cardText">Steel</h2></div>
                </div>

                {(activeSingles[101] === 'semi-flush' && activeSingles[103] !== 'steel') && (//only show if semi-flush is selected
                <>
                <h2 className="sectionTitle">Finish</h2>
                <div className="section textSection singleSection">
                    <div className={`card textCard ${activeSingles[104] === 'BR' ? "active" : ""} longTxt`} onClick={() => handleCardClick(104, 'BR')}><h2 className="cardText">Brass</h2></div>
                    <div className={`card textCard ${activeSingles[104] === 'AB' ? "active" : ""} longTxt`} onClick={() => handleCardClick(104, 'AB')}><h2 className="cardText">Antique Brass</h2></div>
                    <div className={`card textCard ${activeSingles[104] === 'AZ' ? "active" : ""} longTxt`} onClick={() => handleCardClick(104, 'AZ')}><h2 className="cardText">Antique Bronze</h2></div>
                    <div className={`card textCard ${activeSingles[104] === 'SB' ? "active" : ""} longTxt`} onClick={() => handleCardClick(104, 'SB')}><h2 className="cardText">Satin Brass</h2></div>
                    <div className={`card textCard ${activeSingles[104] === 'SK' ? "active" : ""} longTxt`} onClick={() => handleCardClick(104, 'SK')}><h2 className="cardText">Satin Black</h2></div>
                    <div className={`card textCard ${activeSingles[104] === 'PN' ? "active" : ""} longTxt`} onClick={() => handleCardClick(104, 'PN')}><h2 className="cardText">Polished Nickel</h2></div>
                    <div className={`card textCard ${activeSingles[104] === 'SN' ? "active" : ""} longTxt`} onClick={() => handleCardClick(104, 'SN')}><h2 className="cardText">Satin Nickel</h2></div>
                </div>
                </>
                )}

            </div>





            <div className='stickyFooter'>
                {/* <ProgressBar
                    id='mobileProgressBar'
                    activeSingles={activeSingles}
                    connection={connection}
                /> */}

                <div className='footerFlex'>
                    <div className='resetContainer'>
                        <button className='resetButton' onClick={() => {
                            setActiveSingles({});
                        }}>Reset</button>
                    </div>

                    {/* <ProgressBar
                        id='desktopProgressBar'
                        activeSingles={activeSingles}
                        connection={connection}
                    /> */}

                    <div>
                        <div className='totalContainer'>
                            <p className='totalTitle'>Total </p>
                            <h1 className='totalPrice' id='totalPrice'>${totalPrice.toFixed(2)}
                            </h1>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}