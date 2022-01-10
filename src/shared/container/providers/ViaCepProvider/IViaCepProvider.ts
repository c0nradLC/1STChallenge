import { IViaCepDTO } from "./dtos/IViaCepDTO";

interface IViaCepProvider {
    getCEPInfo(cep: string): Promise<IViaCepDTO>;
}

export { IViaCepProvider };