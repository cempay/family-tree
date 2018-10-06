import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { View, Button, Alert } from 'react-native';
import i18n from 'i18next';
import TextField from '../../../components/textField';
import PickerField from '../../../components/pickerField';
import CheckboxField from '../../../components/checkboxField';
import { createRelative, updateRelative } from '../../../actions/relativesActions';
import { ERelativeRelationType, RelativeRelationTypeOptions } from '../../../constants/relativesConstants';
import { isNil, isEmpty } from '../../../Services/util';
import Validator from '../../../Services/validator';
import styles from './styles';

const formName = 'createForm';
const formSelector = formValueSelector(formName);

const filteredRelationTypeOptions = sex => RelativeRelationTypeOptions
  .filter(option => isNil(sex) || option.sex === sex)
  .map(option => ({ ...option, label: i18n.t(option.label) }));

const filteredConnectedRelatives = (relatives, relationType) => (relatives || [])
  .filter(({ father, mother }) => {
    switch (relationType) {
      case ERelativeRelationType.father:
        return !father;
      case ERelativeRelationType.mother:
        return !mother;
      default:
        return null;
    }
  });

class CreatePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const editedRelative = navigation.getParam('editedRelative');
    return {
      title: i18n.t(editedRelative ? 'form/title/edit' : 'form/title/create'),
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    relatives: PropTypes.array.isRequired,
    editedRelative: PropTypes.object,
    formValues: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    editedRelative: null,
  };

  handleSuccess = () => {
    this.props.navigation.goBack();
    Alert.alert(
      '',
      i18n.t('form/message/successSave'),
    );
  };

  handleFailure = (error) => {
    Alert.alert(
      '',
      i18n.t('form/message/failureSave', { error }),
    );
  };

  handleSave = (values) => {
    const { editedRelative } = this.props;
    let data;
    let action;
    if (editedRelative) {
      action = updateRelative;
      data = values;
    } else {
      action = createRelative;
      data = {
        ...values,
        sex: !!values.sex,
      };
      const children = values.relativeId && [values.relativeId];
      if (children) data.children = children;
    }
    action(data)
      .then(this.handleSuccess)
      .catch(this.handleFailure);
  };

  render() {
    const { relatives, editedRelative, formValues: { relationType, sex } } = this.props;
    const editMode = !!editedRelative;
    const emptyRelatives = isEmpty(relatives);
    return (
      <View style={{ padding: 10 }}>
        <Field
          component={TextField}
          name="fullName"
          validate={Validator.validateRequired}
          placeholder={i18n.t('form/fullName/placeholder')}
        />
        {!editMode && (
          <Field
            component={CheckboxField}
            name="sex"
            label={i18n.t('form/sex')}
          />
        )}
        {!editMode && !emptyRelatives && (
          <Field
            component={PickerField}
            name="relationType"
            validate={Validator.validateRequired}
            options={filteredRelationTypeOptions(sex)}
          />
        )}
        {!editMode && !emptyRelatives && (
          <Field
            component={PickerField}
            name="relativeId"
            validate={Validator.validateRequired}
            enabled={relationType && !isNil(relationType)}
            options={filteredConnectedRelatives(relatives, relationType)}
            optionsMap={{ code: '_id', label: 'fullName' }}
          />
        )}
        <Button
          title={i18n.t(editedRelative ? 'actions/edit' : 'actions/save')}
          style={styles.submit}
          onPress={this.props.handleSubmit(this.handleSave)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { navigation: { state: { params: { editedRelative } = {} } } } = ownProps;
  const relatives = state.relatives.list;
  const initialValues = editedRelative || {
    fullName: '',
    sex: true,
    relationType: null,
    relativeId: null,
  };
  if (!isEmpty(relatives)) {
    initialValues.relationType = filteredRelationTypeOptions(initialValues.sex)[0].code;
    const connectedRelative = filteredConnectedRelatives(relatives, initialValues.relationType);
    initialValues.relativeId = connectedRelative && connectedRelative[0]
      && connectedRelative[0]._id;
  }
  return {
    relatives,
    editedRelative,
    initialValues,
    formValues: formSelector(state, 'relationType', 'sex'),
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: formName,
})(CreatePage));
