import LabelText from "./LabelText";

const Input = (props) => {
    const {
        label,
        type,
        name,
        readOnly,
        disabled,
        className,
        placeholder,
        value,
        onChange
    } = props

    return (
        <div className="mb-4 flex flex-col space-y-2">
            <LabelText id={label}>{label}</LabelText>
            <input
                placeholder={placeholder}
                type={type}
                id={label}
                name={name}
                readOnly={readOnly}
                disabled={disabled}
                className={`px-3 py-2 border border-[#808080] rounded-md 
                    focus:outline-1 focus:outline-primary-info-active focus:ring-inset 
                    hover:ring-1 hover:ring-inset hover:ring-[#000] 
                    placeholder:text-sm placeholder:text-[#9AA2B1] focus:placeholder:text-[#092540] 
                    ${className}`}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;