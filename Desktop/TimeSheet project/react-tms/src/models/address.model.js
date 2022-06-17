import Country from './country.model.js';
import State from './state.model.js';

export class AddressModel{
    constructor(id,addressLine1,addressLine2,country,state,zipCode) {
        this.id = null;
        this.AddressModel =null;
        this.addressLine2 = null;
        this.country = new Country;
        this.state = new State;
        this.zipCode = null
    }
    
}