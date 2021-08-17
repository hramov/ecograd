import { HttpException, HttpStatus } from '@nestjs/common';

export class VueResponseException extends HttpException {
  constructor(response: string) {
    super(response, HttpStatus.OK,
    );
  }
}
