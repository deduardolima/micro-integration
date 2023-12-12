
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    constructor(

    ) { }

    @Cron(CronExpression.EVERY_MINUTE, {
        timeZone: 'America/Sao_Paulo',
    })
    async sendPushes() {
        // try {
        //     console.log('cron rodando')
        //     const allPushes = await this.pushService.findAll();
        //     for (const push of allPushes) {
        //         const expiresOn = push.date;
        //         const now = DateTime.now().setZone('America/Sao_Paulo').toMillis();
        //         const difference = Number(expiresOn) - now;
        //         if (expiresOn < now) {
        //             if (!push.status) {
        //                 const transformed = {
        //                     token: push.clients.map((item: any) => item.token)
        //                 };
        //                 await this.pushService.sendNotifications(push, transformed.token);

        //             }
        //         } else {
        //             this.logger.log(`Falta: ${difference} segundos para envio de push`);
        //         }
        //     }
        // } catch (error) {
        //     this.logger.error(error);
        // }

    }

}