export const validationStings = {
    nameMax: 'Name should be of atmost 15 characters.',
    lastNameMax: 'Last name should be of atmost 15 characters.',
    validEmail: 'Please enter a valid email.',
    required: 'This is required.',
    validPhone: 'Please enter a valid phone number.',
    passwordMax: 'Password should be of atmost 15 characters.',
    passwordMin: 'Password should be of atleast 6 characters.',
    passwordMismatch: 'The passwords do not match',
    alphabetOnly: 'Alphabets only.',
    numbersOnly: 'Number only.',
    containNumber: 'This Field must contain a number.',
}

export const regexStrings = {
    emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneRegex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im,
    alphbetRegex: /^[a-zA-Z\s]+$/,
    numaricRegex: /^\d+$/,
    containNumberRegex: /\d/
}

export const messageStings = {

}

export const statusStrings = {
    individual: 'individual',
    company: 'company',
    online: 'FindingTrips',
    offline: 'Offline',
}