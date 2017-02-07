import 'jsdom-global/register';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { map } from 'lodash';
import m from 'mithril';
import mq from 'mithril-query';

import Todo from '../src/components/todo/todo';


describe('Todo', () => {

  const output = mq(m(Todo));

  // Reset the todo in between tests
  beforeEach(() => output.click('.clear'));

  describe('view', () => {
    describe('when initialized', () => {
      it('there are no todo items', () => {
        output.should.not.have('.Todo-item');
        output.should.not.have('.remaining');
      });
    });

    describe('when adding a todo item', () => {
      it('shows up in the list', () => {
        output.setValue('input', 'test item1');
        output.trigger('form', 'submit');
        output.should.have(1, '.Todo-item');
        expect(output.first('.Todo-item > span')).to.have.property('text').and.equal('test item1');
        expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 1');
      });
    });

    describe('when adding multiple todo items', () => {
      it('contains a list of all added todos', () => {
        output.setValue('input', 'test item1');
        output.trigger('form', 'submit');
        output.setValue('input', 'test item2');
        output.trigger('form', 'submit');
        output.setValue('input', 'test item3');
        output.trigger('form', 'submit');
        output.should.have(3, '.Todo-item');
        expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 3');

        map(output.find('.Todo-item > span'), (todo, index) => {
          expect(todo).to.have.property('text').and.equal(`test item${index + 1}`);
        });
      });
    });

    describe('when toggling a todo to complete', () => {
      it('shows todo with a completed class if complete', () => {
        output.setValue('input', 'test item1');
        output.trigger('form', 'submit');
        output.setValue('input', 'test item2');
        output.trigger('form', 'submit');
        output.setValue('input', 'test item3');
        output.trigger('form', 'submit');

        output.click('.Todo-item > span');
        expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 2');
        expect(output.first('.Todo-item > span').attrs).to.have.property('className').and.equal('completed');

        output.click('.Todo-item > span');
        expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 3');
        expect(output.first('.Todo-item > span').attrs).to.have.property('className').and.equal('');
      });
    });
  });

  describe('when toggling hide completed todos', () => {
    it('shows only outstanding todos', () => {
      output.setValue('input', 'test item1');
      output.trigger('form', 'submit');
      output.setValue('input', 'test item2');
      output.trigger('form', 'submit');
      output.setValue('input', 'test item3');
      output.trigger('form', 'submit');

      output.click('.toggle-completed');
      output.should.have(3, '.Todo-item');
      expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 3');

      output.click('.Todo-item > span');
      output.should.have(2, '.Todo-item');
      expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 2');

      output.click('.Todo-item > span');
      output.should.have(1, '.Todo-item');
      expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 1');

      output.click('.Todo-item > span');
      output.should.not.have('.Todo-item');
      output.should.not.have('.remaining');

      output.click('.toggle-completed');
      output.should.have(3, '.Todo-item');
      output.should.not.have('.remaining');
    });
  });

  describe('when deleting a todo item', () => {
    it('should be removed from the list', () => {
      output.setValue('input', 'test item1');
      output.trigger('form', 'submit');
      output.setValue('input', 'test item2');
      output.trigger('form', 'submit');
      output.setValue('input', 'test item3');
      output.trigger('form', 'submit');

      output.should.have(3, '.Todo-item');
      expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 3');

      output.click('.Todo-item > button');
      output.should.have(2, '.Todo-item');
      expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 2');

      output.click('.Todo-item > button');
      output.should.have(1, '.Todo-item');
      expect(output.first('.remaining')).to.have.property('text').and.equal('Remaining todos 1');

      output.click('.Todo-item > button');
      output.should.not.have('.Todo-item');
      output.should.not.have('.remaining');
    });
  });
})
