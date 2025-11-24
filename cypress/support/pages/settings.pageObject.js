import PageObject from '../PageObject';

class SettingsPageObject extends PageObject{
    url = '/settings';

    get updateSettingsButton() {
        return cy.get('button').contains('Update Settings');
    }

    changeItem(placeholder, value) {
        cy.get(`[placeholder="${placeholder}"]`).as('inputField');
        cy.get('@inputField').clear();
        cy.get('@inputField').type(value);
    }

    checkUrl(username) {
        cy.url().should('include', `/profile/${username}`);
    }

    clickUpdateSettingsBtn() {
        this.updateSettingsButton.click();
    }
}

export default SettingsPageObject;