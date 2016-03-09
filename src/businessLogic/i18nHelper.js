export default class i18nHelper {
    static termFromState(component, term, state) {
        if (!(state.i18n && state.terms)) {
            throw new Error('bad state', state);
        }
        if (!state.terms[component]) {
            throw new Error('cannot find terms for component', component);
        }
        let compTerms = state.terms[component];
        if (!compTerms[state.i18n]) {
            throw new Error(`cannot find locale ${state.i18n} in terms for ${component}`);
        }

        const localeTerm = !compTerms[state.i18n][term];
        if (!localeTerm) {
            throw new Error(`cannot find term ${term} in locale ${state.i18n} in terms for ${component}`);
        }
        return localeTerm;
    }
}

