export const ButtonSettings  = ({func}) => {
    return (
        <button className="setting-btn" onClick={func}>
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar1"></span>
      </button>
      
    )
}