import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string; // Identificador único (UUID)
 
    @Column()
    email: string; // Correo electrónico (único)

    @Column()
    password: string; // Contraseña (hashed)

    @Column()
    name: string; // Nombre 

    @Column()
    lastName: string; // Apellido

    @Column({ nullable: true })
    phone: string; // Número de teléfono

    @Column({ nullable: true })
    address: string; // Dirección del domicilio

    @Column({
        type: 'enum',
        enum: ['student', 'teacher', 'admin'],
        default: 'student',
    })
    role: string; // Rol del usuario
    
    @Column({
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active',
    })
    status: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin: Date;
}