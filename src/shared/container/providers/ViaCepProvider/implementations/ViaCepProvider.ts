import viaCep from "../../../../../services/viaCep";

import { IViaCepDTO } from "../dtos/IViaCepDTO";
import { IViaCepProvider } from "../IViaCepProvider";

import { getClient } from "../../../../../utils/redis";
class ViaCepProvider implements IViaCepProvider {
  constructor() {}

  async getCEPInfo(cep: string): Promise<IViaCepDTO> {
    try {
      cep = cep.replace(/\D+/g, "");
      const client = getClient();

      await process.nextTick(() => {}); // Workaround to prevent jest from detecting this as an open handle when testing 
      await client.connect();

      if (! await client.exists(`${cep}`)) {
        const { data } = await viaCep.get(`/${cep}/json`);

        await client.set(`${cep}`, JSON.stringify(data));
        await client.expire(`${cep}`, 300);
        
        return data;
      } else {
        const cepInfo: IViaCepDTO = JSON.parse(await client.get(`${cep}`));

        return cepInfo;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export { ViaCepProvider };