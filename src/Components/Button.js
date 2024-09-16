
function Button ( props ) {
    return(
        <input className='button' type='submit' value={props.value} onClick={ props.onSubmit } />
    )
}

export default Button