import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as packageInfo from '../../../package.json';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getApiInfo() {
    const uptime = process.uptime();
    const uptimeHours = Math.floor(uptime / 3600);
    const uptimeMinutes = Math.floor((uptime % 3600) / 60);
    const uptimeSeconds = Math.floor(uptime % 60);

    return {
      api: {
        name: packageInfo.name,
        description: packageInfo.description,
        version: packageInfo.version,
        author: packageInfo.author,
        license: packageInfo.license,
      },
      status: {
        state: 'online',
        uptime: `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`,
      },
      server: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: {
          total: `${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`,
          free: `${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB`,
        },
        cpus: os.cpus().length,
      },
      documentation: '/api',
      timestamp: new Date().toISOString(),
    };
  }
}
