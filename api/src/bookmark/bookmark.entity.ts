import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'bookmark'})
export class Bookmark {


  @PrimaryColumn({type: 'uuid', name: 'user_id'})
  public userId: string;

  @PrimaryColumn({name: 'movie_id'})
  public movieId: number;

}