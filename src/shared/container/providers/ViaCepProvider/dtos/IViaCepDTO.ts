interface IViaCepDTO {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: number,
    gia: number,
    ddd: number,
    siafi: number
}

export { IViaCepDTO };