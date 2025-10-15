export default ({ label, id, name }) => {
    return (
        <div className="">

            <input
                type="radio"
                id={id}
                name={name}
                className="mr-3"
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}