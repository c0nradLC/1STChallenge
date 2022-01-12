import viaCep from "../../../../../services/viaCep";
import { IViaCepDTO } from "../dtos/IViaCepDTO";
import { IViaCepProvider } from "../IViaCepProvider";

class ViaCepProvider implements IViaCepProvider {
  constructor() {}

  async getCEPInfo(cep: string): Promise<IViaCepDTO> {
    try {
      await process.nextTick(() => {}); // Workaround to make the viaCep.get() axios request not leave an openHandle when testing with jest

      const response = await viaCep.get(`/${cep.replace(/\D+/g, "")}/json`, {
      })
      .then(response => {
        return response;
      })

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

export { ViaCepProvider };