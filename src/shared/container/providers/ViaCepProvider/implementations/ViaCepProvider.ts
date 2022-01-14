import viaCep from "../../../../../services/viaCep";

import { IViaCepDTO } from "../dtos/IViaCepDTO";
import { IViaCepProvider } from "../IViaCepProvider";

class ViaCepProvider implements IViaCepProvider {
  constructor() {}

  async getCEPInfo(cep: string): Promise<IViaCepDTO> {
    try {
      await process.nextTick(() => {}); // Workaround to make the viaCep.get() axios request not leave an openHandle when testing with jest

      const response = await viaCep.get(`/${cep.match(/^[0-9]+$/) ? cep : cep.replace(/\D+/g, "")}/json`)

      return response.data;
    } catch (e) {
    }
  }
}

export { ViaCepProvider };