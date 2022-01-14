interface IUserDTO {
    id?: number;
    nome: string;
    telefone: string;
    cpf?: string;
    cep: string;
    logradouro?: string;
    cidade?: string;
    estado?: string;
    permissions?: string;
}

export { IUserDTO };