import * as types from '../actions/types';

export function setLocale(locale) {
	return { type: types.SET_I18N_LOCALE, locale };
}

export function setCompLocaleTerms(component, locale, terms) {
	return { type: types.SET_I18N_COMP_TERMS, component, locale, terms };
}
