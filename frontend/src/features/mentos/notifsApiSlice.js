import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const notifsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = notifsAdapter.getInitialState()

export const notifsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifs: builder.query({
            query: () => ({
                url: '/notifs',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                   
                },
            }),
            transformResponse: responseData => {
                const loadedNotifs = responseData.map(notif => {
                   notif.id = notif._id
                    return notif
                });
                return notifsAdapter.setAll(initialState, loadedNotifs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Notif', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Notif', id }))
                    ]
                } else return [{ type: 'Notif', id: 'LIST' }]
            }
        }),
        addNewNotif: builder.mutation({
            query: initialMento => ({
                url: '/notifs',
                method: 'POST',
                body: {
                    ...initialMento,
                }
            }),
            invalidatesTags: [
                { type: 'Notif', id: "LIST" }
            ]
        })
    }),
})

export const {
    useGetNotifsQuery,
    useAddNewNotifMutation,
    
} = notifsApiSlice

// returns the query result object
export const selectNotifsResult = notifsApiSlice.endpoints.getNotifs.select()

// creates memoized selector
const selectNotifsData = createSelector(
    selectNotifsResult,
    notifsResult => notifsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotifs,
    selectById: selectNotifById,
    selectIds: selectNotifIds
    // Pass in a selector that returns the notes slice of state
} = notifsAdapter.getSelectors(state => selectNotifsData(state) ?? initialState)