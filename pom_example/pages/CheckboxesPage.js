import { expect } from "@playwright/test";
import CommonActions from '../utils/CommonActions.js'

export default class CheckboxesPage {
    constructor(page){
        this.actions = new CommonActions(page)
    }

    async navigate(){
        await this.actions.navigate('https://the-internet.herokuapp.com/checkboxes')
    }

    async checkCheckbox(index){
        await this.actions.click(`input[type="checkbox"]:nth-of-type(${index})`) 
    }

    async isItChecked(index){
        return await this.actions.isChecked(`input[type="checkbox"]:nth-of-type(${index})`)
    }

    async assertCheckbox(index, expectedChecked){
        const isChecked = await this.isItChecked(index)
        expect(isChecked).toBe(expectedChecked)
    }
}