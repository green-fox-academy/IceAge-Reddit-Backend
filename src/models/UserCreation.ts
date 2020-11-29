import { Description, Example, Format, Required } from "@tsed/schema";
import { Column, CreateDateColumn } from "typeorm";

export class UserCreation {
  @Description("Username")
  @Column()
  @Required()
  username: string;
	
  @Description("User email")
  @Example("user@domain.com")
  @Format("email")
  @Column({unique: true})
	email: string;
	
  @Description("User password")
  @Example("/5gftuD/")
  @Column()
  @Required()
  password: string;

}