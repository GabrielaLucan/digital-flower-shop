import handleError from '../api/handleErrors.js';
import request from 'request';

const CAT_FACT_PUBLIC_API = 'https://catfact.ninja/fact';

export async function executeExternalApiRequest({ url, method = 'GET' }) {
    const options = {
        method,
        url,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error || body?.errors) {
                return reject(error || body);
            }

            const statusCode = response?.statusCode;
            /* eslint-disable prefer-promise-reject-errors */
            if (statusCode && (statusCode < 200 || statusCode >= 300)) {
                return reject({
                    messages: body,
                    status: statusCode,
                });
            }
            return resolve(JSON.parse(body));
        });
    });
}

export default class CatFactController {

    static async getCatFact(req, res, next) {
        try {

            const factResponse = await executeExternalApiRequest({ url: CAT_FACT_PUBLIC_API })

            return res.status(200).json(factResponse)
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);
        }
    }
}
