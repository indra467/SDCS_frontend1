import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { STATUS } from "../../config/status"
import { PERIOD } from "../../config/period"

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('This is description, id required in future.')
    const [userId, setUserId] = useState(users[0].id)
    const [status, setStatus] = useState('Open')
    const [period, setPeriod] = useState('Short Term')


    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            setStatus('')
            setPeriod('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    
    const onStatusChanged = e => setStatus(e.target.value)
    const onPeriodChanged = e => setPeriod(e.target.value)

    const canSave = [title, text, status, userId, period].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, status, title, text, period })
        }
    }
    
    const options = Object.values(STATUS).map(status => {
        return (
            <option
                key={status}
                value={status}

            > {status}</option >
        )
    })

    const options2 = Object.values(PERIOD).map(period => {
        return (
            <option
                key={period}
                value={period}

            > {period}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>Add New Order</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Order-id:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

               

                <label className="form__label form__checkbox-container" htmlFor="status">
                    Status:</label>
                <select
                    id="status"
                    name="status"
                    className="form__select"
                    value={status}
                    onChange={onStatusChanged}
                >
                    {options}
                </select>

                <label className="form__label form__checkbox-container" htmlFor="period">
                    Period:</label>
                <select
                    id="period"
                    name="period"
                    className="form__select"
                    value={period}
                    onChange={onPeriodChanged}
                >
                    {options2}
                </select>

            </form>
        </>
    )

    return content
}

export default NewNoteForm