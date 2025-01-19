import { Controller, Get } from '@nestjs/common';

@Controller('/products')
export class TestController {
  @Get()
  findAllProducts() {
    return 'this is a product controller';
  }
}
