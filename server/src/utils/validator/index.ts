type ValidationStatus = {
    status: boolean
    message: string
}

export class Validator {

    isEmail(email: string, count?: number): ValidationStatus {
        let flag1: boolean = false, flag2: boolean = false
        const emailArr = email.split('')
        emailArr.map(w => {
            if (w === '@') flag1 = true
            if (w === '.') flag2 = true
        })
        if (count && emailArr.length > count) return { status: false, message: 'Length is more than allowed!'}
        if (!(flag1 && flag2)) return { status: false, message: 'Wrong format!'}
        return {
            status: true,
            message: 'OK'
        }
    }

}