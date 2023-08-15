import { Link } from 'react-router-dom'
import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const NotesList = () => {
    useTitle('techNotes: Notes List')

    const { username, isManager, isAdmin, isSales_Employee } = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isManager || isAdmin || isSales_Employee) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

        content = (
            <div className="desktop-16">
      <div className="desktop-16-child" />
      <div className="desktop-16-item" />
      <b className="back1">back</b>
      <div className="desktop-16-inner" />
      
      <b className="b" >1.</b>
      <b className="period">Period</b>
      <b className="order-id">Order ID</b>
      <b className="status">Status</b>
    </div>
        )
    }

    return content
}
export default NotesList
