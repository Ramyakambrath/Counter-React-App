import 'cypress-wait-until';

describe('Counter Functionality Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3001')
    })

    const getButton = (buttonName) => {

        return cy.get(`[data-test=${buttonName}]`)

    }

    const clickIncrementOrDecrementButton = async (counterNumber, numberOfClicks, operation) => {


        let clicks = Array.from({ length: `${numberOfClicks}` }, (_, i) => i + 1)


        clicks.forEach(async (click) => {


            const currentValue = await getcurrentCounterValue(counterNumber);
            const actualCurrentValue = currentValue === 'Zero' ? 0 : parseInt(currentValue);


            cy.get(`[data-test=counter-${counterNumber}]`).find(`[data-test=${operation}]`).click().then(() => {

                cy.get(`[data-test=counter-${counterNumber}]`).find(`[data-test=counterValue]`).should(($listOfElements) => {
                    if (operation === 'increment') {
                        expect($listOfElements.text()).to.equal(`${actualCurrentValue + 1}`)

                    } else if (operation === 'decrement') {
                        expect($listOfElements.text()).to.equal(`${actualCurrentValue}` === '1' ? 'Zero' : `${actualCurrentValue - 1}`)
                    }

                })
            })
        })
    }

    const clickDelete=(counterNumber,counterArray)=>{

        let counterArray1=counterArray.filter(count=> count!==counterNumber && count > counterNumber)
        let counterArray2=counterArray.filter(count=> count!==counterNumber && count < counterNumber)

        cy.get(`[data-test=counter-${counterNumber}]`).find(`[data-test=delete]`).click().then(() => {

            cy.get(`[data-test=counter-${counterNumber}]`).should('not.exist');
            counterArray1.map(val=>{
                cy.get(`[data-test=counter-${val}]`).should('exist');

            })
            counterArray2.map(val=>{
                cy.get(`[data-test=counter-${val}]`).should('not.exist');

            })
        })

    }


    const clickReset=async () => {

        let numberOfCounter=await getTotalNumberOfCounters();

        let counters = Array.from({ length: `${numberOfCounter.length}` }, (_, i) => i + 1)
          
            cy.get(`[data-test=reset]`).click().then(()=> {

                counters.map((counter)=>{

                    cy.get(`[data-test=counter-${counter}]`).find(`[data-test=counterValue]`).should(($listOfElements) => {
                        
                        expect($listOfElements.text()).to.equal('Zero')
                    })

                }) 
                
               
        })
         
  
    }

    const clickReload=async (resolve,reject) => {

        let numberOfCounter=await getTotalNumberOfCounters();

        let counters = Array.from({ length: `${numberOfCounter.length}` }, (_, i) => i + 1)

        getButton('restart').should('not.be.disabled')
          
            cy.get(`[data-test=restart]`).click().then(()=> {

                counters.map((counter)=>{

                    cy.get(`[data-test=counter-${counter}]`).should('exist');

                    cy.get(`[data-test=counter-${counter}]`).find(`[data-test=counterValue]`).should(($listOfElements) => {
                        
                        expect($listOfElements.text()).to.equal('Zero')
                    })

                    

                }) 
            

           
               
        })
    }

    // const clickDecrementButton =async (counterNumber,numberOfClicks) => {

    //     clickIncrementButton(counterNumber,numberOfClicks);
    //     let clicks = Array.from({ length: `${numberOfClicks}` }, (_, i) => i + 1)


    //     clicks.forEach( async(click )=> {


    //         const currentValue=await getcurrentCounterValue(counterNumber);
    //         const actualCurrentValue=currentValue==='Zero'? 0:parseInt(currentValue);

    //         console.log('actualCurrentValue',actualCurrentValue)

    //         cy.get(`[data-test=counter-${counterNumber}]`).find(`[data-test=decrement]`).click().then(()=> {

    //         cy.get(`[data-test=counter-${counterNumber}]`).find(`[data-test=counterValue]`).should(($listOfElements) => {
    //             expect($listOfElements.text()).to.equal(`${actualCurrentValue}`=== '1' ?'Zero':`${actualCurrentValue - 1}`)
    //         })
    //     })
    //      })
    // }

    const getcurrentTotalValue = async () => {

        const text = await new Cypress.Promise((resolve) => {
            getButton('navbarBrand').find('.badge-pill')
            .then((txt) => resolve(txt.text()))


        })

        return text

    }

    const getcurrentCounterValue = async (counterNumber) => {


        const text = await new Cypress.Promise((resolve) => {
            cy.get(`[data-test=counter-${counterNumber}]`).find(`[data-test=counterValue]`)
                .then((txt) => resolve(txt.text()))

        })

        return text


    }

    const getTotalNumberOfCounters = async () => {

        let numberOfCounter=await cy.get('.row').should(($listOfElements) => { 
                    
            return $listOfElements.length
       })
       return numberOfCounter


    }

    

    describe('Counter increment, decrement, delete, reset and restart Test', () => {


        it('should validate the counter increment functionality for each counter by clicking the counter n times and also validate the button color when the count is greater than 0', () => {
           
            let counter = Array.from({ length: 4 }, (_, i) => i + 1)
            

            getButton('counter').within(() => {

                counter.forEach(cnt => {

                    // click on increment button for each counter 3 times and validate the counterValue is incremented by 1 on each click

                    let noOfClicks = 3;
                    clickIncrementOrDecrementButton(cnt, noOfClicks, 'increment')

                    //To check the color ,background color ( should be primary color),font size of the counter value 
                    cy.get(`[data-test=counter-${cnt}]`)
                        .find(`[data-test=counterValue]`)
                        .find('span')
                        .should('have.css', 'background-color', 'rgb(0, 123, 255)')
                        .and('have.css', 'color', 'rgb(255, 255, 255)')
                        .and('have.css', 'font-size', '24px')

                })


            })



        })

        it('should validate the counter decrement functionality for each counter by clicking the counter n times and also validate the button color when the count is greater than 0', () => {

            let counter = Array.from({ length: 4 }, (_, i) => i + 1)

            getButton('counter').within(() => {

                counter.forEach(cnt => {

                    // click on decrement button for each counter 3 times and validate the counterValue is decremented by 1 on each click

                    let noOfClicks = 3;
                    clickIncrementOrDecrementButton(cnt, noOfClicks, 'increment')
                    clickIncrementOrDecrementButton(cnt, noOfClicks, 'decrement')
                    //To check the color ,background color ( should be warning color),font size of the counter value 
                    cy.get(`[data-test=counter-${cnt}]`)
                        .find(`[data-test=counterValue]`)
                        .find('span')
                        .should('have.css', 'background-color', 'rgb(255, 193, 7)')
                        .and('have.css', 'color', 'rgb(33, 37, 41)')
                        .and('have.css', 'font-size', '24px')

                })


            })



        })


        it('should validate the counter delete functionality on each counter ', () => {

            let counter = Array.from({ length: 4 }, (_, i) => i + 1)

            getButton('counter').within(() => {

                counter.forEach(cnt => {

                    // click on delete button on each counter and delete all the counters
                    clickDelete(cnt,counter)

                })

                //check whether the counters are all deleted
                cy.get('button').find('i').should(($listOfElements) => {

                    //check that only 2 buttons - reset and restart buttons are displayed
                    expect($listOfElements).to.have.length(2)

                    //check whether the plus(increment),minus(decrement),delete(trash) buttons are not available on UI
                    expect($listOfElements).not.contain('fa.fa-plus-circle, fa fa-minus-circle, fa fa-trash-o')
                   

                })

            })



        })

        it('should validate the counter reset Button functionality', () => {

            let counter = Array.from({ length: 4 }, (_, i) => i + 1)

            getButton('counter').within(() => {

                counter.forEach(cnt => {

                    // click on increment button for each counter 3 times to make the counter values greater than 0

                    let noOfClicks = 3;
                    clickIncrementOrDecrementButton(cnt, noOfClicks, 'increment')
                   

                })
               // Reset all the counters and validate the counter values after reset
               clickReset();


            })


        })


        it(('should validate the counter restart functionality '), () => {


            let counter = Array.from({ length: 4 }, (_, i) => i + 1)

            getButton('counter').within(() => {

                counter.forEach(cnt => {

                    // click on delete button on each counter and make sure all the counters are deleted

                    clickDelete(cnt,counter)
                   

                })
               // Reload all the counters and validate the counter values after reload and also check the button disable attribute before and after click
               getButton('restart').should('not.be.disabled')
               clickReload()
             
            })
            getButton('restart').should('be.disabled')

        })

        it(('should validate the Total value count on increment '), () => {
         
            let counter = Array.from({ length: 4 }, (_, i) => i + 1)
     
                counter.forEach(cnt => {

                    getButton('counter').within(() => {

                    // click on increment button on each counter 3 times and validate the Total Value on the navbar

                    let noOfClicks = 3;
                    clickIncrementOrDecrementButton(cnt, noOfClicks, 'increment')

                  })

                  //validate the Total value on incrementing each counter
                  cy.get('.badge-pill').should(($listOfElements) => {
                    expect(parseInt($listOfElements.text())).to.equal(cnt)
                })


                })

        })
        it(('should validate the Total value count on increment/decrement '), () => {
            let counter = Array.from({ length: 4 }, (_, i) => i + 1)
            let noOfClicks = 2;
            let currentTotalValue;
            
            counter.forEach(cnt => {
 
                getButton('app').within(async() => {

                // click on increment  button on each counter 2 times and validate the Total Value on the navbar

                clickIncrementOrDecrementButton(cnt, noOfClicks, 'increment')
               
               
              })

              //validate the Total value on incrementing each counter
              cy.get('.badge-pill').should(($listOfElements) => {
                expect(parseInt($listOfElements.text())).to.equal(cnt)
            })


            })

            counter.forEach(cnt => {

               
                getButton('app').within(async() => {

                // click on  decrement buttons on each counter 2 times and validate the Total Value on the navbar
                currentTotalValue = await getcurrentTotalValue();
                clickIncrementOrDecrementButton(cnt, noOfClicks, 'decrement')

              })

              //validate the Total value on decrementing each counter
              cy.get('.badge-pill').should(($listOfElements) => {
                expect(parseInt($listOfElements.text())).to.equal(parseInt(`${currentTotalValue}`)-1)
            })


            })



        })
    })





})

