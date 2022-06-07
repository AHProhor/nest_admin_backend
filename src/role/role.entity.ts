import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Permission} from "../permission/permission.entity";
import {JoinTable} from "typeorm";

@Entity('roles')
export class Role{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @ManyToMany( () => Permission, {cascade: true})
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn:{name:'permission_id', referencedColumnName:'id'}
    })
    permissions: Permission[];
}