function LoginError(props) {
  if (props.message === "") {
    return null
  }

  return (
    <div>
      {props.message}
    </div>
  )
}

export default LoginError
