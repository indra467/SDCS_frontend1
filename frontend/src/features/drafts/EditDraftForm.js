import { useState, useEffect } from "react"
import { useUpdateDraftMutation, useDeleteDraftMutation } from "./draftsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import Styles from "./Draft.module.css"
const EditDraftForm = ({ draft, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateDraft, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateDraftMutation()

    const [deleteDraft, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteDraftMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(draft.title)
    const [text, setText] = useState(draft.text)
    const [completed, setCompleted] = useState(draft.completed)
    const [userId, setUserId] = useState(draft.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/drafts')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveDraftClicked = async (e) => {
        if (canSave) {
            await updateDraft({ id: draft.id, user: userId, title, text, completed })
        }
    }

    const onDeleteDraftClicked = async () => {
        await deleteDraft({ id: draft.id })
    }

    const created = new Date(draft.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(draft.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className={`${Styles.icon_button}`}
                title="Delete"
                onClick={onDeleteDraftClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Nraft #{draft.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className={`${Styles.icon_button}`}
                            title="Save"
                            onClick={onSaveDraftClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="draft-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="draft-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="draft-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="draft-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="draft-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="draft-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="draft-username">
                            ASSIGNED TO:</label>
                        <select
                            id="draft-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditDraftForm