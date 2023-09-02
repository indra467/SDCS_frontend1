import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const mentosAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = mentosAdapter.getInitialState()

export const mentosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMentos: builder.query({
            query: () => ({
                url: '/mentos',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                   
                },
            }),
            transformResponse: responseData => {
                const loadedMentos = responseData.map(mento => {
                    mento.id = mento._id
                    return mento
                });
                return mentosAdapter.setAll(initialState, loadedMentos)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Mento', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Mento', id }))
                    ]
                } else return [{ type: 'Mento', id: 'LIST' }]
            }
        }),
        addNewMento: builder.mutation({
            query: initialMento => ({
                url: '/mentos',
                method: 'POST',
                body: {
                    ...initialMento,
                }
            }),
            invalidatesTags: [
                { type: 'Mento', id: "LIST" }
            ]
        }),
        updateMento: builder.mutation({
            query: initialMento => ({
                url: '/mentos',
                method: 'PATCH',
                body: {
                    ...initialMento,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Mento', id: arg.id }
            ]
        }),
        deleteMento: builder.mutation({
            query: ({ id }) => ({
                url: `/mentos`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Mento', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetMentosQuery,
    useAddNewMentoMutation,
    useUpdateMentoMutation,
    useDeleteMentoMutation,
} = mentosApiSlice

// returns the query result object
export const selectMentosResult = mentosApiSlice.endpoints.getMentos.select()

// creates memoized selector
const selectMentosData = createSelector(
    selectMentosResult,
    mentosResult => mentosResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMentos,
    selectById: selectMentoById,
    selectIds: selectMentoIds
    // Pass in a selector that returns the notes slice of state
} = mentosAdapter.getSelectors(state => selectMentosData(state) ?? initialState)