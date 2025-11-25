/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SettingsPage from '../support/pages/settings.pageObject';

const settingPage = new SettingsPage();

describe('Settings page', () => {
  const newPassword = faker.internet.password();
  const newUsername = `${faker.person.lastName().toLocaleLowerCase()}`;
  const newBio = faker.person.bio();
  const newEmail = faker.internet.email();

  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      cy.login(
        generateUser.email, 
        generateUser.username, 
        generateUser.password
      );
      user = generateUser;
      cy.visit('/settings');
    });
  });

  it('should provide an ability to update username', () => {
    settingPage.changeItem('username-input', `${newUsername}`);
    settingPage.clickUpdateSettingsBtn();
    settingPage.checkInput('username-input', newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingPage.changeItem('bio-input', `${newBio}`);
    settingPage.clickUpdateSettingsBtn();
    settingPage.checkInput('bio-input', newBio);
  });

  it('should provide an ability to update an email', () => {
    settingPage.changeItem('email-input', `${newEmail}`);
    settingPage.clickUpdateSettingsBtn();
    cy.contains('Settings').click();
    settingPage.checkInput('email-input', newEmail.toLowerCase());
  });

  it('should provide an ability to update password', () => {
    settingPage.changeItem('password-input', `${newPassword}`);
    settingPage.clickUpdateSettingsBtn();
    cy.get('[data-cy="logout-btn"]')
      .contains('Or click here to logout.').click();
    cy.url().should('include', '/');
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type(newPassword);
    cy.get('[data-cy="sign-in-btn"]')
      .eq(1)
      .click();
  });

  it('should provide an ability to log out', () => {
    cy.get('[data-cy="logout-btn"]')
      .contains('Or click here to logout.').click();
    cy.url().should('include', '/');
  });
});
