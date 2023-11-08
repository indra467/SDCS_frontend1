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
import {AiOutlineMenuUnfold, AiOutlineMenuFold} from 'react-icons/ai'
import {  LogoutOutlined } from "@ant-design/icons";
import Styles from './DashHeader.module.css';
import { MdArrowBack, MdControlPoint } from "react-icons/md";
import { AiFillControl } from "react-icons/ai";
import { RiDraftFill } from "react-icons/ri";
import { FaFirstdraft } from "react-icons/fa";

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
                <MdControlPoint size={40}/>
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
                <RiDraftFill size={40}/>
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
                <AiFillControl size={40}/>
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
                <FaFirstdraft size={30}/>
            </button>
        )
    }

    const logoutButton = (
        <button
            className={`${Styles.icon_button}`}
            title="Logout"
            onClick={sendLogout}
        >
            <LogoutOutlined size={15}/>
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
          icon={collapse ? <AiOutlineMenuUnfold className="menu_icon" size={30}/> : <AiOutlineMenuFold className="menu_icon" size={30}/>}
          onClick={()=>changeCollapse()}
          className="text-light"
        />
          <Link to="/dash" className={`${Styles.company_logo}`}>
            <h1 className={`${Styles.dash_header__title}`}>Shri Dinesh Crane Services</h1>
          </Link>
          <nav className={`${Styles.dash_header__nav}`}>{buttonContent}</nav>
        </div>
      </header>
      {!pathname.endsWith('dash') && <button onClick={()=>navigate(-1)} className={`${Styles.back}`}><MdArrowBack size={20}/>
      </button>}
    </>
  );

  return content;
}
export default DashHeader;