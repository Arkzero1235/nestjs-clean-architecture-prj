import * as crypto from 'crypto';

export function generateSignature(data: any, checksumKey: string): string {
    const { amount, cancelUrl, description, orderCode, returnUrl } = data;

    const rawData = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;

    const signature = crypto
        .createHmac('sha256', checksumKey)
        .update(rawData)
        .digest('hex');

    return signature;
}
