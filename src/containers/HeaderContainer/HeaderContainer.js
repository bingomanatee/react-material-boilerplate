import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/i18nActions';
import objectAssign from 'object-assign';
import ReactFlag from 'react-flags';
import { Layout, Button , Header, Drawer } from 'react-mdl';

import enTerms from './terms/en-US.json';

class HeaderContainer extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        appState: PropTypes.object.isRequired
    };

    render() {
        const chooseFrenchLocale = () => {
            this.props.actions.setLocale('fr-FR');
        };

        const chooseUSlocale = () => {
            this.props.actions.setLocale('en-US');
        };

        return (
          <Header
            chooseI18n={this.props.actions.setLocale}
            appState={this.props.appState}
          >
              <Button href="/">Home</Button>
              <Button href="/About">About</Button>
              <Button onClick={chooseUSlocale}>
                  <ReactFlag basePath="/flags" format="png" name="US"/> American
              </Button>
              <Button onClick={chooseFrenchLocale}>
                  <ReactFlag basePath="/flags" format="png" name="FR"/> French
              </Button>
          </Header>

        );
    }
}

function mapStateToProps(state) {
    let terms = state.i18nState.componentTerms.HeaderContainer || {'en-US': enTerms};
    let locale = state.i18nState.locale;
    return {
        appState: objectAssign({}, state.fuelSavingsAppState, {terms: terms[locale]})
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
