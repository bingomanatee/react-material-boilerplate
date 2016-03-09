import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/i18nActions';
import objectAssign from 'object-assign';
import ReactFlag from 'react-flags';
import { Layout, Button , Header, Drawer } from 'react-mdl';

import enTerms from './terms/en-US.json';
import frTerms from './terms/fr-FR.json';
import {IndexLoginCard} from './IndexLoginCard/IndexLoginCard';
let loadedTerms = false;

class IndexPageComponent extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired,
    terms: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    if (!loadedTerms) {
      props.actions.setCompLocaleTerms('IndexPage', 'en-US', enTerms);
      props.actions.setCompLocaleTerms('IndexPage', 'fr-FR', frTerms);
      loadedTerms = true;
    }
  }

  render () {
    const terms = this.props.terms;

    return (
      <div>
        <h1>{terms.title}</h1>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col"><IndexLoginCard /></div>
          <div className="mdl-cell mdl-cell--6-col">6</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  let terms = state.i18nState.componentTerms.IndexPage || {'en-US': enTerms};
  let locale = state.i18nState.locale;
  return {
    terms: terms[locale]
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

/**
 * the IndexPageComponent is the fully bound component;
 * the IndexPage is a raw component, for testing purposes.
 */
const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export {IndexPage, IndexPageComponent, enTerms, frTerms};
