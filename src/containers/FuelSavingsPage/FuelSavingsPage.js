import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/fuelSavingsActions';
import * as i18nActions from '../../actions/i18nActions';

import { FuelSavingsForm, enTerms, frTerms} from '../../components/FuelSavingsForm/FuelSavingsForm';
import objectAssign from 'object-assign';
let loadedTerms = false;

class FuelSavingsComponent extends Component {
    constructor(props) {
        console.log('FuelSavingsComponent props', props);
        super(props);
        if (!loadedTerms) {
            props.actions.setCompLocaleTerms('FuelSavingsForm', 'en-US', enTerms);
            props.actions.setCompLocaleTerms('FuelSavingsForm', 'fr-FR', frTerms);
            loadedTerms = true;
        }
    }

    static propTypes = {
        actions: PropTypes.object.isRequired,
        appState: PropTypes.object.isRequired
    };

    render() {
        return (
          <FuelSavingsForm
            saveFuelSavings={this.props.actions.saveFuelSavings}
            calculateFuelSavings={this.props.actions.calculateFuelSavings}
            appState={this.props.appState}
          />
        );
    }
}

function mapStateToProps(state) {
    console.log('------- FuelSavingsComponent STATE: ', state);
    let terms = state.i18nState.componentTerms.FuelSavingsForm || {'en-US': enTerms};
    let locale = state.i18nState.locale;
    console.log(`mapStateToProps ------------- getting locale ${locale} from terms ${JSON.stringify(terms)}`);
    return {
        appState: objectAssign({}, state.fuelSavingsAppState, {terms: terms[locale]})
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(objectAssign({}, actions, i18nActions), dispatch)
    };
}

const FuelSavingsPage =  connect(
  mapStateToProps,
  mapDispatchToProps
)(FuelSavingsComponent);

export {FuelSavingsPage, FuelSavingsComponent, enTerms, frTerms}
