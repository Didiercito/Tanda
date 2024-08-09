export class User {
    public id: any;
    public first_name: string;
    public second_name: string
    public lastnames: string 
    public age : number;
    public email: string;
    public phone_number: number; 
    public date_of_birth: string;
    public role_id: number;
    
    constructor(id: any, first_name: string, second_name: string, lastnames: string, age: number, email: string, phone_number: number, date_of_birth:string, role_id: number){
        this.id = id, this.first_name = first_name, this.second_name = second_name, this.lastnames = lastnames, this.age = age, this.email = email, this.phone_number = phone_number, this.date_of_birth = date_of_birth, this.role_id = role_id
    }
}