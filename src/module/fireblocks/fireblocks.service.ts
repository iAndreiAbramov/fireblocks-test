import { Injectable } from '@nestjs/common';

@Injectable()
export class FireblocksService {
  async getSometing() {
    return 'something';
  }
}
