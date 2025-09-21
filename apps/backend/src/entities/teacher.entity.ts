import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity('teachers')
export class Teacher {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    teacherId: string; // Identificación del profesor (puede ser un número de empleado u otro identificador)

    @Column({ nullable: true })
    specialization: string; // Especialización o área de estudio del profesor

    @Column({ type: 'text', array: true, nullable: true })
    subjects: string[]; // Materias que enseña el profesor

    @ManyToMany(() => Course, (course) => course.teacher)
    @JoinTable()
    courses: Course[]; // Cursos que imparte el profesor

    @OneToOne(() => User)
    @JoinColumn()
    user: User; // Relación uno a uno con la entidad User

}
