import LoginPage from "./LoginPage.js";
import SecurePage from "./SecurePage.js";
import CheckboxesPage from "./CheckboxesPage.js";

export default class PomManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page)
        this.securePage = new SecurePage(page)
        this.checkboxesPage = new CheckboxesPage(page)
    }
}