import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Student } from './student.entity';
import { Course } from './course.entity';

@Entity('grades')
export class Grade {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // Nombre del grado (por ejemplo, "9no Grado", "10mo Grado", etc.)

    @Column()
    level: string; // Nivel educativo (por ejemplo, "Secundaria", "Bachillerato", etc.)

    @Column({ nullable: true })
    section: string; // Sección del grado (por ejemplo, "A", "B", etc.)

    @OneToMany(() => Student, (student) => student.gradeId)
    @JoinTable()
    students: Student[]; // Estudiantes que pertenecen a este grado

    @ManyToMany(() => Course)
    @JoinTable()
    courses: Course[]; // Cursos asociados a este grado
}