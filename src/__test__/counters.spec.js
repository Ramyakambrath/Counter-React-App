import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../Utils';
import Counters from '../components/counters';

describe('Counters Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {

            counters:[
                { id: 1, value: 0 },
                { id: 2, value: 0 },
                { id: 3, value: 0 },
                { id: 4, value: 0 }
              ],
            onReset:jest.fn(),
            onRestart:jest.fn(),

            };
            const propsError = checkProps(Counters, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });

    describe('Component Renders', () => {

        let wrapper;
        let props
        beforeEach(() => {
            
             props = {
                
                counters:[
                    { id: 1, value: 0 },
                    { id: 2, value: 0 },
                    { id: 3, value: 0 },
                    { id: 4, value: 0 }
                  ],
                  onReset:jest.fn().mockName('onReset'),
                  onRestart:jest.fn().mockName('onRestart'),
      
                
            };
            wrapper = shallow(<Counters {...props} />);
        });

        it('Should renders without error', () => {
            const component = findByTestAtrr(wrapper,'counter');
            expect(component.length).toBe(1);
        });
         it('Should render a reset button', () => {
            const button = findByTestAtrr(wrapper, 'reset');
            expect(button.length).toBe(1);
        });

        it('Should render a restart button', () => {
            const button = findByTestAtrr(wrapper, 'restart');
            expect(button.length).toBe(1);
        });
       

        it('Should emit callback on click event on reset button', () => {
            const button = findByTestAtrr(wrapper, 'reset');
            button.simulate('click');
            expect(props.onReset).toHaveBeenCalled()
        });
        it('Should emit callback on click event on restart button', () => {
            const button = findByTestAtrr(wrapper, 'restart');
            button.simulate('click');
            expect(props.onRestart).toHaveBeenCalled()
        });
       
    });



});