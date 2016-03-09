import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/i18nActions';
import objectAssign from 'object-assign';
import ReactFlag from 'react-flags';
import { Card, Button, CardTitle, CardActions } from 'react-mdl';

import enTerms from './terms/en-US.json';
import frTerms from './terms/fr-FR.json';
let loadedTerms = false;

class IndexLoginCardComponent extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    terms: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    if (!loadedTerms) {
      props.actions.setCompLocaleTerms('IndexLoginCard', 'en-US', enTerms);
      props.actions.setCompLocaleTerms('IndexLoginCard', 'fr-FR', frTerms);
      loadedTerms = true;
    }
  }

  render () {
    const terms = this.props.terms;
    return (
      <Card className="mdl-card--index-login-card">
        <CardTitle className="mdl-mdl-card__title--index-login-card">
          <h2 className="mdl-card__title-text">{terms.title}</h2>
        </CardTitle>
      </Card>
    );
  }
}

function mapStateToProps (state) {
  let terms = state.i18nState.componentTerms.IndexLoginCard || {'en-US': enTerms};
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

const IndexLoginCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexLoginCardComponent);

export {IndexLoginCard, IndexLoginCardComponent, enTerms, frTerms};
