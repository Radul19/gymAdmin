import { v4 as uuid } from 'uuid';
import moment from "moment";

export const memTypes = ['Membership 1', 'Membership 2', 'Membership 3', 'Membership 4']

const plusMonths = (plus = 0) => {
    const today = moment().format("YYYY M D").split(" ");
    const dim = moment(today[1], "M").daysInMonth();
    let year = parseInt(today[0]);
    let month = parseInt(today[1]);
    let day = parseInt(today[2]);
    if (month + plus > 12) {
        month = month + plus - 12;
        year = year + 1;
    } else {
        month = month + plus - 12;
    }
    if (dim < day) {
        day = dim;
    }

    return [year.toString(), month.toString(), day.toString()];
};
const today = () => {
    return moment().format("YYYY M D").split(" ");
};

export class User {
    constructor({ name, card_id, phone, birth, email, gender, membership_type, membership }) {



        this._id = uuid()
        this.name = name
        this.card_id = card_id
        this.phone = phone
        this.birth = birth.replaceAll("-", "/")
        this.email = email
        this.gender = gender
        this.memmembership_type = membership_type
        this.membership = plusMonths(parseInt(membership.split(" ")[0]))
        this.attemps = []
        this.createdAt = today()
        this.createdAtWeek = moment().week()
    }

    registerUser = async () => {

        let aux = await electron.readUsers()
        let aux2 = JSON.parse(aux)
        aux2.push({ ...this })
        electron.writeUsers(JSON.stringify(aux2))


        // ipcRenderer.send('registerUser','hey this is a message from front')
        // mainProcess.test()

        // file.users = file.users.push(this)
        // console.log(this)
        // file.users.push({...this})
        // console.log(file)


        // fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        //     if (err) return console.log(err);
        //     console.log(JSON.stringify(file));
        //     console.log('writing to ' + fileName);
        // });
    }
}