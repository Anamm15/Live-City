const ErrorMessage = (props) => {
    const { children, type } = props;
    return (
        <div className={`text-xs !leading-tight ${type === 'error' ? 'text-danger-main' : 'text-success-main'}`}>
            {children}
        </div>
    )
}

export default ErrorMessage;