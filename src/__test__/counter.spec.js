import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../Utils';
import Counter from '../components/counter';

describe('Counter Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {

               key:1,
               counter:{ id: 1, value: 0 },
               onIncrement:jest.fn(),
               onDecrement:jest.fn(),
               onDelete:jest.fn()
               
            };
            const propsError = checkProps(Counter, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });

    describe('Component Renders', () => {

        let wrapper;
        let props;
        beforeEach(() => {
             props = {
                key:1,
                counter:{ id: 1, value: 0 },
                onIncrement:jest.fn().mockName('onIncrement'),
                onDecrement:jest.fn().mockName('onDecrement'),
                onDelete:jest.fn().mockName('onDelete')
            };
            wrapper = shallow(<Counter {...props} />);
        });

        it('Should renders without error', () => {
            const component = findByTestAtrr(wrapper,'counter-1');
            expect(component.length).toBe(1);
        });


        it('Should render a increment button', () => {
            const button = findByTestAtrr(wrapper, 'increment');
            expect(button.length).toBe(1);
        });

        it('Should render a decrement button', () => {
            const button = findByTestAtrr(wrapper, 'decrement');
            expect(button.length).toBe(1);
        });
        it('Should render a delete button', () => {
            const button = findByTestAtrr(wrapper, 'delete');
            expect(button.length).toBe(1);
        });
        it('Should render a counter value button', () => {
            const button = findByTestAtrr(wrapper, 'counterValue');
            expect(button.length).toBe(1);
        });
        it('Should emit callback on click event on increment button', () => {
            const button = findByTestAtrr(wrapper, 'increment');
            button.simulate('click');
            expect(props.onIncrement).toHaveBeenCalled()
        });
        it('Should emit callback on click event on decrement button', () => {
            const button = findByTestAtrr(wrapper, 'decrement');
            button.simulate('click');
            expect(props.onDecrement).toHaveBeenCalled()
        });
        it('Should emit callback on click event on delete button', () => {
            const button = findByTestAtrr(wrapper, 'delete');
            button.simulate('click');
            expect(props.onDelete).toHaveBeenCalled()
        });
        



    });


    describe('Should NOT render', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                key:1,
                counter:{ id: 1, value: 0 },
                
            };
            wrapper = shallow(<Counter {...props} />);
        });


        it('Component is not rendered', () => {
            const component = findByTestAtrr(wrapper, 'counter-0');
            expect(component.length).toBe(0);
        });

    });


});