import React from 'react';
import renderer from 'react-test-renderer';
import ExploreSectors from '../src/Explore/ExploreSectors';

test('render correctly', () => {
  const tree = renderer.create(<ExploreSectors />).toJSON();
  expect(tree).toMatchSnapshot();
});
