
export const state = {
    example: 'abc'
}

export const TYPES = {};

export const mutations = {
    exampleMut(state, data) {
        state.example = {
            ...data
        }
    }
};