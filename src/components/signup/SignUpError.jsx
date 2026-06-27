function SignUpError(props) {
  if (props.message === "") {
    return null
  }

  return (
    <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
      {props.message}
    </div>
  )
}

export default SignUpError
