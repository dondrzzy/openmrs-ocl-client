import React from 'react';
import { shallow } from 'enzyme';
import { DictionaryModal } from '../../components/dashboard/components/dictionary/common/DictionaryModal';
import organizations from '../__mocks__/organizations';
import dictionary from '../__mocks__/dictionaries';
import { AddDictionary } from '../../components/dashboard/components/dictionary/AddDictionary';

const props = {
  title: 'Add Dictionary',
  buttonname: 'Add Dictionary',
  show: true,
  modalhide: jest.fn(),
  submit: jest.fn(),
  organizations: [organizations],
  fetchingOrganizations: jest.fn(),
  createDictionary: jest.fn(),
  createDictionaryUser: jest.fn(),
  handleHide: jest.fn(),
  name: jest.fn(),
  dictionary,
};

describe('Test suite for dictionary modal', () => {
  const wrapper = shallow(<DictionaryModal {...props} />);
  const preventDefault = { preventDefault: jest.fn() };
  const toUpperCase = { toUpperCase: jest.fn() };
  const then = { then: jest.fn() };

  it('should take a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().componentDidMount());
  });
  it('Test to find and click cancel and add dictionary buttons', () => {
    expect(wrapper.find('#cancel').simulate('click'));
    expect(wrapper.find('#addDictionary').simulate('click', preventDefault));
    expect(wrapper.instance().validate(preventDefault));
  });
  it('Tests that the component changes state', () => {
    wrapper.setState({ errors: {} });
    expect(wrapper.state('errors')).toEqual({});
  });

  it('Opens and closes modal on trigger', () => {
    expect(wrapper.find('#cancel').simulate('click'));
  });

  it('Sets the state of the component to the value of the input elements on change', () => {
    wrapper.find('#dictionary_name').simulate('change', { target: { value: 'CIEL', name: 'name' } });
    expect(wrapper.state().data.name).toEqual('CIEL');
  });

  it('Renders component that adds a dictionary', () => {
    const data = {
      dictionary: {
        name: toUpperCase,
        submit: then,
        then: jest.fn(),
      },
    };
    const component = shallow(<AddDictionary {...props} {...preventDefault} {...data} />);
    expect(component).toMatchSnapshot();
  });
  it('it should handle change of supported locales option', () => {
    const otherLanguagesSelect = wrapper.find('#supported_locales');
    expect(otherLanguagesSelect.length).toEqual(1);
    otherLanguagesSelect.simulate('change', [{ value: 'fr', label: 'French [fr]' }]);
    expect(wrapper.state().data.supported_locales).toEqual('fr');
  });

  it('it should render when editing dictionary', () => {
    props.isEditingDictionary = true;
    const editDictionaryModal = shallow(<DictionaryModal {...props} />);
    expect(editDictionaryModal).toMatchSnapshot();
  });
});
