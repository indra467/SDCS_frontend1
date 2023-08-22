import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Styles from './DashHeader.module.css';

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const DRAFTS_REGEX = /^\/dash\/drafts(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = ({collapse,changeCollapse}) => {

    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewDraftClicked = () => navigate('/dash/drafts/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onDraftsClicked = () => navigate('/dash/drafts')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash_header__container__small"
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className={`${Styles.icon_button}`}
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newDraftButton = null
    if (NOTES_REGEX.test(pathname)) {
        newDraftButton = (
            <button
                className={`${Styles.icon_button}`}
                title="New Draft"
                onClick={onNewDraftClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className={`${Styles.icon_button}`}
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className={`${Styles.icon_button}`}
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className={`${Styles.icon_button}`}
                title="Notes"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    let draftsButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        draftsButton = (
            <button
                className={`${Styles.icon_button}`}
                title="Drafts"
                onClick={onDraftsClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className={`${Styles.icon_button}`}
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newDraftButton}
                {newUserButton}
                {notesButton}
                {draftsButton}
                {userButton}
                {logoutButton}
            </>
        )
    }
  



  const content = (
    <>
      {/* <p className={errClass}>{error?.data?.message}</p> */}

      <header className={`${Styles.dash_header}`}>
        <div className={`${Styles.dash_header__container} ${Styles.dashClass}`}>
        <Button
          type="text"
          icon={collapse ? <MenuUnfoldOutlined className="menu_icon"/> : <MenuFoldOutlined className="menu_icon"/>}
          onClick={()=>changeCollapse()}
        />
          <Link to="/dash">
            <h1 className={`${Styles.dash_header__title}`}>Shri Dinesh Crane Services</h1>
          </Link>
          <nav className={`${Styles.dash_header__nav}`}>{buttonContent}</nav>
        </div>
      </header>
    </>
  );

  return content;
}
export default DashHeader;