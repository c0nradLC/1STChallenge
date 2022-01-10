import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    telefone: string;
    
    @Column()
    cpf: string;
    
    @Column()
    cep: string;
    
    @Column()
    logradouro: string;
    
    @Column()
    cidade: string;
    
    @Column()
    estado: string;
}