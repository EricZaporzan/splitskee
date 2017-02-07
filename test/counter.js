import 'jsdom-global/register';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import m from 'mithril';
import mq from 'mithril-query';

import Counter from '../src/components/counter/counter';


describe('Counter', () => {

  const output = mq(m(Counter));

  // Reset the counter in between tests
  beforeEach(() => output.click('.reset'));

  describe('view', () => {
    describe('when initialized', () => {
      it('renders a count of zero', () => {
        expect(output.first('span')).to.have.property('text').and.equal(0);
      });
    });

    describe('when increment button clicked twice', () => {
      it('renders a count of two', () => {
        output.click('.increment');
        output.click('.increment');
        expect(output.first('span')).to.have.property('text').and.equal(2);
      });
    });

    describe('when decrement button clicked twice', () => {
      it('renders a count of negative two', () => {
        output.click('.decrement');
        output.click('.decrement');
        expect(output.first('span')).to.have.property('text').and.equal(-2);
      });
    });
  });
})
