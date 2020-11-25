import {Controller, Post} from "@tsed/common";

@Controller("/auth")
export class HelloWorldController {

	constructor(){
		
	}

  @Post("/sign-in")
  get() {
    return "hello";
  }
}
