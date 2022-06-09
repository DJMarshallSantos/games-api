import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running!\n Please check http://localhost:5000/api for Swagger docs...';
  }
}
