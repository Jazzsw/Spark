export default function ProgressBar({ id, activeCards, connection }) {

    const totalSections = 6;
    const completedSections = Object.keys(activeCards).length;
    const progress = (completedSections + (connection !== 'Connection' ? 1 : 0)) / totalSections * 100;

    return (
        <div id={id} className= {`progressBarContainer ${id === 'mobileProgressBar' ? 'mobileProgressBar' : 'desktopProgressBar'}`}>
            <div className="progressBar" style={{ width: `${100/6}%`, height: '100%', background: connection !== 'Connection' ? 'rgba(57, 149, 230, 0.3)' : 'transparent', borderRadius: '8px 0 0 8px' }}/>
            <div className="progressBar" style={{ width: `${100/6}%`, height: '100%', background: activeCards[1] ? 'rgba(57, 149, 230, 0.3)' : 'transparent' }} />
            <div className="progressBar" style={{ width: `${100/6}%`, height: '100%', background: activeCards[2] ? 'rgba(57, 149, 230, 0.3)' : 'transparent' }} />
            <div className="progressBar" style={{ width: `${100/6}%`, height: '100%', background: activeCards[3] ? 'rgba(57, 149, 230, 0.3)' : 'transparent' }} />
            <div className="progressBar" style={{ width: `${100/6}%`, height: '100%', background: activeCards[4] ? 'rgba(57, 149, 230, 0.3)' : 'transparent' }} />
            <div className="progressBar" style={{ width: `${100/6}%`, height: '100%', background: activeCards[5] ? 'rgba(57, 149, 230, 0.3)' : 'transparent', borderRadius: '0 8px 8px 0' }} />
        </div>
    );
}
