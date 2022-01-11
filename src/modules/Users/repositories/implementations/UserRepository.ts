import { IUserDTO } from "../../dtos/IUserDTO";
import { User } from "../../entities/User";
import { getRepository, Repository } from "typeorm";
import { IUserRepository } from "../IUserRepository";
// import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;
  
    constructor() {
      this.repository = getRepository(User);
    }

    async create(data: IUserDTO): Promise<void> {
      const user = this.repository.create({
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        cep: data.cep,
        logradouro: data.logradouro,
        cidade: data.cidade,
        estado: data.estado,
      })
  
      await this.repository.save(user);
    }

    async update(data: IUserDTO): Promise<User> {
      const user = this.repository.create({
        id: Number(data.id),
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        cep: data.cep,
        logradouro: data.logradouro,
        cidade: data.cidade,
        estado: data.estado,
      });
  
      const updatedUser = await this.repository.save(user);
  
      return updatedUser;
    }

    async deleteById(id: number): Promise<IUserDTO> {

      const user = this.getById(id);

      await this.repository.delete(id);

      return user;
    }
  
    async getById(id: number): Promise<IUserDTO> {
      const user = await this.repository.createQueryBuilder('users')
        .where(`users.id = ${id}`)
        .getOne();
  
      return user;
    }

    async getByCPF(cpf: string): Promise<IUserDTO> {
      const user = await this.repository.createQueryBuilder('users')
        .where(`users.cpf = '${cpf}'`)
        .getOne()

      return user;
    }

    async getAll(): Promise<IUserDTO[]> {
      const users = await this.repository.createQueryBuilder('users')
        .getMany();
      
      return users;
    }
  }
  
  export { UserRepository }