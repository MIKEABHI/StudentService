export class CreateClientModel{
    constructor(id,about,address,billingAddress,clientCode,industry,name,futureFocus,focusAreas,status,url,selected){
        this.id = null;
        this.about = null;
        this.address = new Address();
        this.billingAddress = new Address();
        this.clientCode = null;
        this.industry = new IdClass();
        this.name = null;
        this.futureFocus = null;
        this.focusAreas = [];
        this.status = null;
        this.url = null;
        this.selected= false
    }
    }
