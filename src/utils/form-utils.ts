// @arg type - can either by the input type or the input name
export function validateField(type: string, value: string) {

    switch (type) {
        case "first-name":
            if (value != "") return true
            break
        case "email":
            if (value.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i)) return true
            break
        case "password":
            if (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)) return true
            break
        default:
            return false
    }
}