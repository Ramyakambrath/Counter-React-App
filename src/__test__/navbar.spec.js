import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../Utils';
import Navbar from '../components/navbar';

describe('Navbar Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {

                counters: [
                    { id: 1, value: 0 },
                    { id: 2, value: 0 },
                    { id: 3, value: 0 },
                    { id: 4, value: 0 }
                  ]
               
            };
            const propsError = checkProps(Navbar, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });

    describe('Component Renders', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                counters: [
                    { id: 1, value: 0 },
                    { id: 2, value: 0 },
                    { id: 3, value: 0 },
                    { id: 4, value: 0 }
                  ]
            };
            wrapper = shallow(<Navbar {...props} />);
        });

        it('Should renders without error', () => {
            const component = findByTestAtrr(wrapper,'navbarBrand');
            expect(component.length).toBe(1);
        });
        it('Should render Total Value', () => {
            const totalCounter = findByTestAtrr(wrapper, 'totalCounter');
            expect(totalCounter.length).toBe(1);
        });
        it('Should render cart Icon', () => {
            const icon = findByTestAtrr(wrapper, 'cartIcon');
            expect(icon.length).toBe(1);
        });

    });


    


});