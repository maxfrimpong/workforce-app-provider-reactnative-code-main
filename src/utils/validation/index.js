import { regexStrings, validationStings } from "../strings";

export const validation = {
    required: {
        required: {
            value: true,
            message: validationStings.required
        }
    },
    name: {
        required: {
            value: true,
            message: validationStings.required,
        },
        maxLength: {
            value: 15,
            message: validationStings.nameMax,
        },
        pattern: {
            value: regexStrings.alphbetRegex,
            message: validationStings.alphabetOnly
        }
    },
    lastName: {
        required: {
            value: true,
            message: validationStings.required,
        },
        maxLength: {
            value: 15,
            message: validationStings.lastNameMax,
        },
        pattern: {
            value: regexStrings.alphbetRegex,
            message: validationStings.alphabetOnly
        }
    },
    email: {
        required: {
            value: true,
            message: validationStings.required,
        },
        pattern: {
            value: regexStrings.emailRegex,
            message: validationStings.validEmail,
        }
    },
    phone: {
        required: {
            value: true,
            message: validationStings.required
        },
        pattern: {
            value: regexStrings.phoneRegex,
            message: validationStings.validPhone
        },
    },
    password: {
        required: {
            value: true, message: validationStings.required,
        },
        pattern: {
            value: regexStrings.containNumberRegex,
            message: validationStings.containNumber,
        },
        maxLength: { value: 15, message: validationStings.passwordMax },
        minLength: { value: 6, message: validationStings.passwordMin },
    },
    confirmPassword: (currentPassword) => ({
        required: { value: true, message: validationStings.required },
        validate: value => value === currentPassword || validationStings.passwordMismatch
    }),
    numaric: {
        required: {
            value: true,
            message: validationStings.required,
        },
        pattern: {
            value: regexStrings.numaricRegex,
            message: validationStings.numbersOnly,
        }
    },
    phoneNotRequired: {
        pattern: {
            value: regexStrings.phoneRegex,
            message: validationStings.validPhone
        },
    },
}