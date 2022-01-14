import { hash } from 'bcrypt';

export default async function ValidateAndReturnCPF(cpf: string) {
    let sum = 0;
    let remaining;

    cpf = cpf.replace(/\D+/g, "");

    if (!/[0-9]{11}/.test(cpf)) return "";
    if (cpf === "00000000000") return "";

    sum = 0;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remaining = sum % 11;

    if (remaining === 10 || remaining === 11 || remaining < 2) {
        remaining = 0;
    } else {
        remaining = 11 - remaining;
    }

    if (remaining !== parseInt(cpf.substring(9, 10))) {
        return "";
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remaining = sum % 11;

    if (remaining === 10 || remaining === 11 || remaining < 2) {
        remaining = 0;
    } else {
        remaining = 11 - remaining;
    }

    if (remaining !== parseInt(cpf.substring(10, 11))) {
        return "";
    }

    return await hash(cpf, process.env.BCRYPT_SALT);
}