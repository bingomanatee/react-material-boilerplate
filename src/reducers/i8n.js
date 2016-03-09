import { SET_I18N_LOCALE, SET_I18N_COMP_TERMS } from '../actions/actionTypes';
import objectAssign from 'object-assign';

const initialState = {
    locale: 'en-US',
    componentTerms: {}
};

function updateTerms(state, action) {
    const newTerms = {[action.locale]: action.terms};

    let componentTerms = state.componentTerms[action.component];
    let allComponentTerms = objectAssign({}, state.componentTerms);

    if (componentTerms) {
        allComponentTerms[action.component] = objectAssign({}, componentTerms, newTerms)
    } else {
        allComponentTerms[action.component] = newTerms
    }
    return allComponentTerms;
}

export default function i18NState(state = initialState, action) {
    let outState;

    switch (action.type) {
        case SET_I18N_LOCALE:
            outState = objectAssign({}, state, {locale: action.locale});
            break;

        case SET_I18N_COMP_TERMS:
            outState = objectAssign({}, state, {componentTerms: updateTerms(state, action)});
            break;

        default:
            outState = state;
    }

    return outState;
}
