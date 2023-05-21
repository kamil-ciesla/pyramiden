import { createPlan, updateTitle } from './firestorePlan'

export class Plan {
    constructor(userId, planId = null) {
        this.id = createPlan();
        this.properties = {}
    }

    set properties(properties) {
        this.propertiesObject = properties
    }

    get properties() {
        return this.propertiesObject;
    }

    set title(title) {
        this.properties.title = title
        updateTitle(this.id, title)
    }

    set cost(value) {
        this.properties.cost = value
    }

    set currency(currency) {
        this.properties.currency = currency
    }



}