/// <reference types="cypress" />
/// <reference types="../support" />

import { faker }  from '@faker-js/faker';
import  SettingsPage  from '../support/pages/settings.pageObject';

const settingPage = new SettingsPage();

describe('Settings page', () => {
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
    const newUsername = `${faker.person.lastName().toLocaleLowerCase()}`;

    settingPage.changeItem('Username', `${newUsername}`);
    settingPage.clickUpdateSettingsBtn();
    settingPage.checkUrl(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.person.bio();

    settingPage.changeItem('Short bio about you', `${newBio}`);
    settingPage.clickUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingPage.changeItem('Email', `${newEmail}`);
    settingPage.clickUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();

    settingPage.changeItem('New Password', `${newPassword}`);
    settingPage.clickUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to log out', () => {
    const newUsername = faker.person.fullName();

    cy.contains('button', 'Or click here to logout.').click();
    cy.url().should('include', '/');
  });
});
