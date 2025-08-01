// src/payos/payos.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PayReqDto } from 'lib/interface/dtos/PayReqDto';
import { generateSignature } from './pay.utils';

@Injectable()
export class PayosService {
    private readonly baseUrl = 'https://api-merchant.payos.vn';
    private readonly clientId = process.env.PAYOS_CLIENT_ID;
    private readonly apiKey = process.env.PAYOS_API_KEY;

    async createPayment(paymentData: PayReqDto) {
        const { PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY } = process.env;

        if (!PAYOS_CLIENT_ID || !PAYOS_API_KEY || !PAYOS_CHECKSUM_KEY) {
            throw new Error('Missing PayOS credentials in environment variables.');
        }

        const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

        if (!checksumKey) {
            throw new Error('Missing PAYOS_CHECKSUM_KEY in environment variables.');
        }

        // Tạo chữ ký
        const signature = generateSignature(paymentData, checksumKey);

        // console.log(signature);
        
        // Gửi đi kèm chữ ký
        const payload = {
            ...paymentData,
            signature,
        };

        const headers = {
            'Content-Type': 'application/json',
            'x-client-id': this.clientId,
            'x-api-key': this.apiKey,
        };

        try {
            const res = await axios.post(`${this.baseUrl}/v2/payment-requests`, payload, {
                headers,
            });

            console.log(res.data);

            return res.data;
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
            throw err;
        }
    }
}
