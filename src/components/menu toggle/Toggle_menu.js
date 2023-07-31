import "./togglemenu.css"

function Toggle_menu(props) {
  return (
      <div onClick={props.handleClick} className={`icon nav-icon-6 ${props.clicked ? 'open' : ''}`} >
          <span></span>
          <span></span>
          <span></span>
      </div>
  )
}

export default Toggle_menu