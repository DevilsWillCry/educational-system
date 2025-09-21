import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Student } from "./student.entity";
import { Course } from "./course.entity";

@Entity('enrollments')
export class Enrollment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    enrollmentDate: Date;

    @Column( { type: 'date', nullable: true })
    endDate: Date;

    @Column({ default: 'active' })
    status: string; // active, completed, cancelled

    @Column( { type: 'decimal', precision: 5, scale: 2, nullable: true })
    finalGrade: number; // Nota final del curso, puede ser null si el curso está en progreso


    @ManyToOne(() => Student, student => student.enrollments) // Relación muchos a uno con Student
    @JoinTable()
    student: Student[];

    @ManyToOne(() => Course, course => course.enrollments) // Relación muchos a uno con Course
    @JoinTable()
    course: Course[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}