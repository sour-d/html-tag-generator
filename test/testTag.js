const { Tag } = require('../src/tag.js');
const assert = require('assert');

describe('Tag', () => {
  it('Should return true if class is same and have same value', () => {
    const tag1 = new Tag('div');
    const tag2 = new Tag('div');
    assert.ok(tag1.equals(tag2));
  });

  it('Should return false if class is not same and don\'t have same value', () => {
    const tag1 = new Tag('link', false);
    const tag2 = new Tag('div');
    assert.ok(!tag1.equals(tag2));
  });
});