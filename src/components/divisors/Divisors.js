import "../divisors/divisors.css"

function Divisors(props) {
  return (
    <>
        <div className="customizedContainer">
            <h2 className='customizedText'>
                {props.text}
            </h2>
        </div>
    </>
  )
}

export default Divisors