import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";

@Entity()
export class Post {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column("text")
	description: string;

	@Column("text")
	content: string;

	@Column({ default: 0 })
	views: number;

	@Column({default: new Date().toLocaleDateString() })
	date: string;

}
