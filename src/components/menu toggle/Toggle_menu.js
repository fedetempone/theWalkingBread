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

// este componente no lo ejecuto en el navbar y hace lo siguiente
// const [clicked, setClicked] = useState(false);
//   const handleClick = () => {
//     setClicked(!clicked);
//   };

// cuando clickeo el div estoy accediendo a las propiedades del objeto props 
// las cuales son clicked y handleclick. 
// y basicamente cuando hago click en el div que contiene el icono de hamburguesa del navbar
// se ejecuta la funcion handeClick del navbar (la explico en su componente) y 
// si clicked es true entonces le agrego la clase open, si no no se la agrego.
// osea que si clickeo el boton de menu hamburugesa se despliega otro menu
// y sino lo clickeo queda ahi cerradito.
