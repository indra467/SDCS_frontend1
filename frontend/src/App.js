import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import DraftsList from './features/drafts/DraftsList'
import MentosList from './features/mentos/MentosList'
import NotifsList from './features/mentos/NotifsList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import EditDraft from './features/drafts/EditDraft'
import EditMento from './features/mentos/EditMento'
import NewNote from './features/notes/NewNote'
import NewMento from './features/mentos/NewMento'
import NewDraft from './features/drafts/NewDraft'
import Sales from './features/notes/Sales'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';

function App() {
  useTitle('SDCS')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                  <Route path="sales" element={<Sales />} />
                </Route>

                <Route path="notifs">
                  <Route index element={<NotifsList />} />
                </Route>

                <Route path="drafts">
                  <Route index element={<DraftsList />} />
                  <Route path=":id" element={<EditDraft />} />
                  <Route path="new" element={<NewDraft />} />
                 
                </Route>

                <Route path="mentos">
                  <Route index element={<MentosList />} />
                  <Route path=":id" element={<EditMento />} />
                  <Route path="new" element={<NewMento />} />
                 
                </Route>

              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;
