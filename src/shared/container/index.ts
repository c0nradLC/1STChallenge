import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/Users/repositories/IUserRepository';
import { UserRepository } from '../../modules/Users/repositories/implementations/UserRepository';

import { ViaCepProvider } from './providers/ViaCepProvider/implementations/ViaCepProvider';
import { IViaCepProvider } from './providers/ViaCepProvider/IViaCepProvider';

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
)

container.registerInstance<IViaCepProvider>(
    'ViaCepProvider',
    new ViaCepProvider(),
);