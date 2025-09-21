import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';
import { Grade } from './grade.entity';
import { Enrollment } from './enrollment.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tittle: string; // Título del curso

    @Column()
    code: string; // Código del curso

    @Column()
    description: string; // Descripción del curso

    @Column({ nullable: true })
    credits: number;

    @Column( { default: true })
    status: boolean;

    @ManyToMany(() => Grade, (grade) => grade.courses)  
    @JoinTable()
    grades: Grade[];

    @ManyToMany(() => Student, (student) => student.courses)    
    @JoinTable()
    students: Student[];

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
    enrollments: Enrollment[];

    @ManyToOne(() => Teacher, (teacher) => teacher.courses)
    teacher: Teacher[];

}