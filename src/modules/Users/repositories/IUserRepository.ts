import { IUserDTO } from '../dtos/IUserDTO';
import { User } from '../entities/User';

interface IUserRepository {
    create(data: IUserDTO): Promise<User>;
    update(data: IUserDTO): Promise<User>;
    deleteById(id: number): Promise<IUserDTO>;
    getById(id: number): Promise<IUserDTO>;
    getByCPF(id: string): Promise<IUserDTO>;
    getAll(): Promise<IUserDTO[]>;
}

export { IUserRepository };