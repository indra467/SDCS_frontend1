import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
         
            <tr className="table__row">
                
                
                <td className="table__cell note__title">{note.title}</td>
                <td className="table__cell note__username">{note.period}</td>
                <td className="table__cell note__username">{note.status}</td>
                
               

                
            </tr>
        )

    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote