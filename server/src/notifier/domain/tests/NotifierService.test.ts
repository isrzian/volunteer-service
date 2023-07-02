import {describe, beforeAll, expect, afterEach, test} from '@jest/globals';
import {NotifierService} from '../services/NotifierService';
import {MailProvider} from '../providers/MailProvider';
import {INotifierBaseOptions, INotifierSendOptions} from '../interfaces/INotifierSendOptions';
import {INotifierProvider} from '../interfaces/INotifierProvider';
import NotifierProviderCollisionException from '../exceptions/NotifierProviderCollisionException';
import {IMailService} from '../interfaces/IMailService';
import NotifierProviderNotFoundException from '../exceptions/NotifierProviderNotFoundException';

let sentMessage = 'initial';

async function initMocks() {
    const mailService: IMailService = {
        sendEmail(fromEmail, toEmail, message, attachments) {
            sentMessage = message;
            return Promise.resolve(undefined);
        },
    };

    const mailService2: IMailService = {
        sendEmail(fromEmail, toEmail, message, attachments) {
            sentMessage = message;
            return Promise.resolve(undefined);
        },
    };

    const FakeProvider1: INotifierProvider = {
        type: 'mail',
        name: 'mail1',
        send(options: INotifierBaseOptions): Promise<void> {
            sentMessage = options.message;
            return Promise.resolve(null);
        },
    };

    const realProviders = [
        new MailProvider(mailService),
        FakeProvider1,
        // TODO new SmsRuCallProvider(smsService),
        // TODO new SmsRuCallProvider(callService),
    ];

    return {
        realProviders,
    };
}

describe('NotifierService', () => {
    let mocks;
    let notifierService: NotifierService;

    beforeAll(async () => {
        mocks = await initMocks();
        notifierService = new NotifierService(mocks.realProviders);
    });

    afterEach(() => {
        sentMessage = 'initial';
    });

    describe('send', () => {
        test('successful send with base options', async () => {
            const options: INotifierSendOptions = {
                message: 'Test, test',
                mail: {
                    name: 'mail1',
                    toEmail: '123',
                },
            };
            expect(sentMessage)
                .toEqual('initial');

            await notifierService.send(options);

            expect(sentMessage)
                .toEqual(options.message);
        });

        test('ProviderCollision', async () => {
            const options: INotifierSendOptions = {
                message: 'Test, test',
                mail: {
                    toEmail: '123',
                },
            };
            expect(sentMessage)
                .toEqual('initial');

            try {
                await notifierService.send(options);

                // TODO not obvious...
                expect(true)
                    .toBe(false);
            } catch (e) {
                expect(e)
                    .toBeInstanceOf(NotifierProviderCollisionException);
            }
        });

        test('NotFoundProvider', async () => {
            const options: INotifierSendOptions = {
                message: 'Test, test',
                mail: {
                    name: 'fake',
                    toEmail: '123',
                },
            };
            expect(sentMessage)
                .toEqual('initial');

            try {
                await notifierService.send(options);

                // TODO not obvious...
                expect(true)
                    .toBe(false);
            } catch (e) {
                expect(e)
                    .toBeInstanceOf(NotifierProviderNotFoundException);
            }
        });

        // TODO test('NotFoundProvider', async () => {});
    });
});
