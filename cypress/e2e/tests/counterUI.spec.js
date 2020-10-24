describe('Counter UI Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3001')
    })

    const getButton = (buttonName) => {

        return cy.get(`[data-test=${buttonName}]`)

    }


    describe('Counter App UI on initial reload', () => {


        it('should validate the navbar ', () => {

            //Check background color of the navbar

            cy.get('.navbar').should('have.css','background-color', 'rgb(248, 249, 250)')

            getButton('navbarBrand').within(() => {

                cy.get('i').should(($listOfElements) => {

                    //check whether the cart icon is available
                    $listOfElements.has('i.fa fa-shopping-cart')

                })

                //To check whether each Total value is '0' on the Navbar on initial load

                cy.get('.badge-pill').should(($listOfElements) => {
                    expect($listOfElements.text()).to.equal('0')
                })

                //To ckeck the color ,background color ,width of the Total value element
                cy.get('.badge-pill')
                    .should('have.css', 'background-color', 'rgb(23, 162, 184)')
                    .and('have.css', 'color', 'rgb(255, 255, 255)')
                    .and('have.css', 'width', '50px')



            })



        })


        it('should validate the reset button ', () => {

            getButton('counter').within(() => {

                //to check that there is only one reset button available
                getButton('reset').should(($listOfElements) => {
                    expect($listOfElements).to.have.length(1)
                })


                cy.get('button').find('i').should(($listOfElements) => {

                    //check whether the reset(refresh) buttons are available
                    $listOfElements.has('i.fa fa-refresh')

                })

                //check whether the reset button has disabled attribute set to false on initial load
                getButton('reset').should('not.be.disabled')


                //check the color and background color of the reset button.
                getButton('reset')
                    .should('have.css', 'background-color', 'rgb(40, 167, 69)')
                    .and('have.css', 'color', 'rgb(255, 255, 255)')


                // hover check
                getButton('reset')
                    .trigger('mouseover', 'center')
                    .should('have.css', 'cursor', 'pointer')


            })



        })


        it('should validate restart button ', () => {

            getButton('counter').within(() => {


                //To check that there is only one Restart button available
                getButton('restart').should(($listOfElements) => {
                    expect($listOfElements).to.have.length(1)
                })

                cy.get('button').find('i').should(($listOfElements) => {

                    //check whether the restart(recycle) buttons are available
                    $listOfElements.has('i.fa fa-recycle')

                })


                //check whether the restart button has disabled attribute set to false on initial load
                getButton('restart').should('be.disabled')


                //check the color and background color of the restart button.
                getButton('restart')
                    .should('have.css', 'background-color', 'rgb(0, 123, 255)')
                    .and('have.css', 'color', 'rgb(255, 255, 255)')

                // hover check
                getButton('restart')
                    .trigger('mouseover', 'center', { force: true })
                    .should('not.have.css', 'cursor', 'pointer')


            })



        })

        it('should have 4 counters displayed with increment, decrement and delete buttons and counter value', () => {

            let counter = Array.from({ length: 4 }, (_, i) => i + 1)

            getButton('counter').within(() => {

                counter.forEach(cnt => {

                    //To check the counter count is 4

                    cy.get('.row').should(($listOfElements) => {          
                        expect($listOfElements.length).to.equal(4)
                   })

                    cy.get(`[data-test=counter-${cnt}]`).should(($listOfElements) => {
                        expect($listOfElements).to.have.length(1)
                    })

                    //To check whether each counter value is Zero on initial load

                    cy.get(`[data-test=counter-${cnt}]`).find(`[data-test=counterValue]`).should(($listOfElements) => {
                        expect($listOfElements.text()).to.equal('Zero')
                    })

                    //To ckeck the color ,background color ( should be warning color),font size of the counter value 
                    cy.get(`[data-test=counter-${cnt}]`)
                        .find(`[data-test=counterValue]`)
                        .find('span')
                        .should('have.css', 'background-color', 'rgb(255, 193, 7)')
                        .and('have.css', 'color', 'rgb(33, 37, 41)')
                        .and('have.css', 'font-size', '24px')


                })


            })


            getButton('counterButtons').within(() => {


                cy.get('button').find('i').should(($listOfElements) => {

                    //check the how many buttons are displayed for all the 4 counters together
                    expect($listOfElements).to.have.length(12)

                    //check whether the plus(increment),minus(decrement),delete(trash) buttons are available
                    $listOfElements.has('i.fa.fa-plus-circle', 'fa fa-minus-circle', 'fa fa-trash-o')

                })

            })



        })

        it(('should validate the increment button appearance and mousehover '), () => {


            getButton('counterButtons').within(() => {
                //check whether the increment button has icon class fa fa-plus-circle
                getButton('increment').find('i').should('have.class', 'fa fa-plus-circle')

                //check whether the increment button has disabled attribute set to false
                getButton('increment').should('not.be.disabled')

                //check the color and background color of the increment button.
                getButton('increment')
                    .should('have.css', 'background-color', 'rgb(108, 117, 125)')
                    .and('have.css', 'color', 'rgb(255, 255, 255)')



            })
            //check the hover effect on the first button
            getButton('counter-1').within(() => {

                getButton('increment')
                    .trigger('mouseover', 'center')
                    .should('have.css', 'cursor', 'pointer')

                // getButton('increment')
                // .invoke('mouseover','center',{ bubbles: false })
                // .should('have.class', 'btn-secondary')
                // .and('have.css', 'color', 'rgb(255, 255, 255)')


            })




        })

        it(('should validate the decrement button appearance and mousehover '), () => {


            getButton('counterButtons').within(() => {
                //check whether the decrement button has icon class fa fa-minus-circle
                getButton('decrement').find('i').should('have.class', 'fa fa-minus-circle')

                //check whether the decrement button has disabled attribute set to true on initial load
                getButton('decrement').should('be.disabled')

                //check the color and background color of the decrement button.
                getButton('decrement')
                    .should('have.css', 'background-color', 'rgb(23, 162, 184)')
                    .and('have.css', 'color', 'rgb(255, 255, 255)')



            })
            //check the hover effect on the first decrement button
            getButton('counter-1').within(() => {

                getButton('decrement')
                    .trigger('mouseover', 'center', { force: true })
                    .should('not.have.css', 'cursor', 'pointer')


            })




        })
        it(('should validate the delete button appearance and mousehover '), () => {


            getButton('counterButtons').within(() => {
                //check whether the delete button has icon class fa fa-trash-o
                getButton('delete').find('i').should('have.class', 'fa fa-trash-o')

                //check whether the delete button has disabled attribute set to false on initial load
                getButton('delete').should('not.be.disabled')

                //check the color and background color of the delete button.
                getButton('delete')
                    .should('have.css', 'background-color', 'rgb(220, 53, 69)')
                    .and('have.css', 'color', 'rgb(255, 255, 255)')



            })
            //check the hover effect on the first delete button
            getButton('counter-1').within(() => {

                getButton('delete')
                    .trigger('mouseover', 'center')
                    .should('have.css', 'cursor', 'pointer')


            })




        })
    })





})

