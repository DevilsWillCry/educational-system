import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';
import { Grade } from './grade.entity';
import { Enrollment } from './enrollment.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  grade: string; // Grado o nivel del estudiante

  @Column({ nullable: true })
  section: string; // Sección o grupo del estudiante

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date; // Fecha de nacimiento del estudiante

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable()
  courses: Course[]; // Cursos en los que está inscrito el estudiante

  @ManyToOne(() => Grade, (grade) => grade.id, { nullable: true })
  gradeId: Grade;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student) // Relación uno a muchos con
  enrollments: Enrollment[];

  @CreateDateColumn()
  screatedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
