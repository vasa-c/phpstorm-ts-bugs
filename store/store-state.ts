// see https://youtrack.jetbrains.com/issue/WEB-46778

export interface IStateTest {
    value: number;
}

export const state = () => ({
    value: 5,
});

export const getters = {

    /* Use "state" as argument name. Bug with type inferred.
     * In this case state is considered as "any".
     * In another project "state.value" leads to error (I could not reproduce it here)
     * This is reproduced when vue.js plugin (bundled 202.6397.115) is enabled
     */

    getValue(state: IStateTest): number {
        return state.value; // ok as expected (error on another project)
    },

    getValueAsString(state: IStateTest): string {
        return state.value; // ok, but expected error, value is number, function must return string
    },

    getUndefinedField(state: IStateTest): string {
        return state.x; // ok, byt expected error (state doesn't contain field "x")
    },

    /* Use other argument name. Bug is disappered. */

    getValueX(stateX: IStateTest): number {
        return stateX.value; // ok as expected
    },

    getValueAsStringX(stateX: IStateTest): string {
        return state.value; // error as expected
    },

    getUndefinedFieldX(stateX: IStateTest): string {
        return state.x; // error as expected
    },

};
