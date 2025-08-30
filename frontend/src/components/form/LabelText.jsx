const LabelText = (props) => {
    const { children, id } = props
    return (
        <label htmlFor={id} className="font-semibold text-gray-800">{children}</label>
    )
}

export default LabelText;