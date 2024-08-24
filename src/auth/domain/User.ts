export class User {
    public id: string;
    public names: string;
    public lastnames: string;
    public email: string;
    public password: string;
    public numberTelefonic: string;
    public address: string;
    public date_of_briath: Date; 


    constructor(id: string, names: string, lastnames: string, email: string, password: string, numberTelefonic: string, address: string, date_of_briath: Date){
        this.id = id, this.names = names, this.lastnames = lastnames, this.email = email, this.password = password, this.address = address, this.numberTelefonic = numberTelefonic, this.date_of_briath = date_of_briath;
    }
}