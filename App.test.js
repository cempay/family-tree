import React from 'react';
import renderer from 'react-test-renderer';
// import App from './App';

it('renders without crashing', () => {
  const rendered = renderer.create(<div />).toJSON();
  expect(rendered).toBeTruthy();
});
