import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const draftsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = draftsAdapter.getInitialState()

export const draftsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDrafts: builder.query({
            query: () => ({
                url: '/drafts',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedDrafts = responseData.map(draft => {
                    draft.id = draft._id
                    return draft
                });
                return draftsAdapter.setAll(initialState, loadedDrafts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Draft', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Draft', id }))
                    ]
                } else return [{ type: 'Draft', id: 'LIST' }]
            }
        }),
        addNewDraft: builder.mutation({
            query: initialDraft => ({
                url: '/drafts',
                method: 'POST',
                body: {
                    ...initialDraft,
                }
            }),
            invalidatesTags: [
                { type: 'Draft', id: "LIST" }
            ]
        }),
        updateDraft: builder.mutation({
            query: initialDraft => ({
                url: '/drafts',
                method: 'PATCH',
                body: {
                    ...initialDraft,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Draft', id: arg.id }
            ]
        }),
        deleteDraft: builder.mutation({
            query: ({ id }) => ({
                url: `/drafts`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Draft', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetDraftsQuery,
    useAddNewDraftMutation,
    useUpdateDraftMutation,
    useDeleteDraftMutation,
} = draftsApiSlice

// returns the query result object
export const selectDraftsResult = draftsApiSlice.endpoints.getDrafts.select()

// creates memoized selector
const selectDraftsData = createSelector(
    selectDraftsResult,
    draftsResult => draftsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDrafts,
    selectById: selectDraftById,
    selectIds: selectDraftIds
    // Pass in a selector that returns the notes slice of state
} = draftsAdapter.getSelectors(state => selectDraftsData(state) ?? initialState)