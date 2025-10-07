export default function Input({ label, id, type, name, onBlur, onChange, value, error, ...props }) {
    return (
        <div className="control no-margin">
            <label htmlFor={id}>{ label }</label>
            <input
                id={id}
                type={type}
                name={name}
                {...props}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
            />
            <div className="control-error">
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}