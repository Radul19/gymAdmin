import { v4 as uuid } from 'uuid';
import moment from "moment";

export const memTypes = ['Membership 1', 'Membership 2', 'Membership 3', 'Membership 4']

const plusMonths = (plus = 0, plusDate = false) => {
    let currentDate = plusDate ? plusDate : moment();
    let futureMonth = moment(currentDate).add(plus, 'M');
    let futureMonthEnd = moment(futureMonth).endOf('month');

    if (currentDate.date() != futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
        futureMonth = futureMonth.add(1, 'd');
    }

    return moment(futureMonth).valueOf();
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
        this.membership_type = membership_type
        this.membership = plusMonths(parseInt(membership.split(" ")[0]))
        this.attemps = []
        this.payments = []
        this.createdAt = +moment()
        this.createdAtWeek = moment().week()
    }

    registerUser = async () => {

        let aux = await electron.readUsers()
        let aux2 = JSON.parse(aux)
        aux2.push({ ...this })
        electron.writeUsers(JSON.stringify(aux2))

    }


}
/** types: 1-Creation 2-Subscription */
/** Amount types: True-Dolar False-Bs.f */
export class Payment {
    constructor({ card_id, name, phone, amount, amount_type, months, id }) {
        this.card_id = card_id
        this.name = name
        this.phone = phone
        this.id = id
        this.amount = amount
        this.amount_type = amount_type
        this.months = months
    }

    registerPayment = async () => {
        let res = await electron.readPays()
        let payments = JSON.parse(res)
        payments.push({ ...this })
        electron.writePays(JSON.stringify(payments))
    }
}

const readUsers = async () => {
    let res = await electron.readUsers()
    return JSON.parse(res)

}

export const findUser = async (card_id) => {
    let users = await readUsers()
    return users.find((item) => item.card_id === card_id)

}
export const pushAccess = async (card_id, set) => {
    let users = await readUsers()
    let bool = false
    let count = 0
    let i = -1
    users.forEach((user, index) => {
        if (user.card_id === card_id) {
            if (moment(user.membership).unix() > moment().unix()) {
                bool = true
            }
            i = index
        }
        count += user.attemps.length
    });
    let info = {
        time: +moment(),
        status: bool,
        id: count + 1
    }

    if (i < 0) {
        return { status: 404, msg: 'No se ha encontrado al usuario ' }
    } else {
        let todayinfo = {
            ...info,
            name: users[i].name,
            card_id: users[i].card_id,
            phone: users[i].phone,
        }
        users[i].attemps.push(info)
        electron.writeUsers(JSON.stringify(users))
        set(prev => ({ ...prev, today: [...prev.today, todayinfo] }))

        if (bool) return { status: 200, msg: "Acceso exitoso" }
        else return { status: 401, msg: 'El usuario no tiene acceso a las instalaciones' }

    }
}

export const paymentsAmount = async () => {
    let res = await electron.readPays()
    let payments = JSON.parse(res)
    return payments.length + 1
}

export const updateMembership = async (months, card_id) => {
    let users = await readUsers()
    const user = await findUser(card_id)
    let today = +moment()
    if (today > user.membership) {
        user.membership = plusMonths(parseInt(months.split(" ")[0]))
    } else {
        user.membership = plusMonths(parseInt(months.split(" ")[0]), user.membership)
    }
    let index = users.findIndex((item) => item.card_id === user.card_id)
    users[index] = user
    await electron.writeUsers(JSON.stringify(users))

}