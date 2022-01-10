import { injectable } from "tsyringe";
import viaCep from "../../../../../services/viaCep";

import { IViaCepDTO } from "../dtos/IViaCepDTO";

import { IViaCepProvider } from "../IViaCepProvider";
import { AppError } from "../../../../../errors/AppError";

@injectable()
class ViaCepProvider implements IViaCepProvider {
  constructor() {}

  async getCEPInfo(cep: string): Promise<IViaCepDTO> {
    try {
      const response = await viaCep.get(`/${cep.replace(/\D+/g, "")}/json`);

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

export { ViaCepProvider };
