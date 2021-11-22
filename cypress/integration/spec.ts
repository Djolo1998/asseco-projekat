describe('My First Test', () => {
  it('A2 Categorize single transaction', () => {
    cy.visit('/');
    // click on add to category first transaction in table
    cy.get(
      '#pr_id_3-table > tbody > tr:nth-child(1) > td:nth-child(8) > div > p-button:nth-child(2) > button'
    ).click();

    //click to select from category dropdown
    cy.get('#add-category-dropdown > div').click();
    //select from category
    cy.get('#pr_id_6_list > p-dropdownitem:nth-child(2) > li').click({
      force: true,
    });

    cy.get('#add-category-dropdown > .p-dropdown').should(
      'have.text',
      'Auto & Transport'
    );
    // cy.get('[ng-reflect-label="Auto & Transport"]').should('be.selected');

    //click to select from subcategory dropdown
    cy.get('#add-sub-category-dropdown > div').click();
    //select from subcategory
    cy.get('#pr_id_7_list > p-dropdownitem:nth-child(3) > li').click({
      force: true,
    });

    cy.get('#add-sub-category-dropdown > .p-dropdown').should(
      'have.text',
      'Auto Leasing'
    );
    //click apply
    cy.get('#add-category-apply').click();

    cy.get(
      '.p-datatable-tbody > :nth-child(1) > :nth-child(6) > .ng-star-inserted'
    ).should('have.text', ' Auto Leasing ');
  });

  it('A4 Split transaction', () => {
    cy.get(
      '#pr_id_3-table > tbody > tr:nth-child(2) > td:nth-child(8) > div > p-button:nth-child(1) > button'
    ).click();

    //click to select from category dropdown
    cy.get('#splits-add-category-dropdown-0 > div').click();

    //select from category
    cy.get('[ng-reflect-label="Misc Expenses"] > .p-ripple').click({
      force: true,
    });

    cy.get('#splits-add-category-dropdown-0 > .p-dropdown').should(
      'have.text',
      'Misc Expenses'
    );

    //fill amount input
    cy.get(
      ':nth-child(2) > [style="margin-top: 10px;"] > .p-inputwrapper > .p-inputnumber > .p-inputtext'
    )
      .invoke('val', '4.25')
      .trigger('blur');

    cy.get(
      ':nth-child(2) > [style="margin-top: 10px;"] > .p-inputwrapper > .p-inputnumber > .p-inputtext'
    ).should('have.value', '4.25');

    //click to select from category dropdown
    cy.get('#splits-add-category-dropdown-1 > div').click();

    //select from category
    cy.get('[ng-reflect-label="Auto & Transport"] > .p-ripple').click({
      force: true,
    });

    cy.get('#splits-add-category-dropdown-1 > .p-dropdown >').should(
      'have.text',
      'Auto & Transport'
    );

    //fill amount input
    cy.get(
      ':nth-child(3) > [style="margin-top: 10px;"] > .p-inputwrapper > .p-inputnumber > .p-inputtext'
    )
      .invoke('val', '2.65')
      .trigger('blur');

    cy.get(
      ':nth-child(3) > [style="margin-top: 10px;"] > .p-inputwrapper > .p-inputnumber > .p-inputtext'
    ).should('have.value', '2.65');

    //click apply btn
    cy.get('[label="Apply"] > .p-ripple').click();

    cy.get(
      '.p-datatable-tbody > :nth-child(2) > :nth-child(6) > .ng-star-inserted'
    ).should('have.text', '2 Categories Split');
  });
});
