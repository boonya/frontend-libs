import {ExtendableError} from '@boonya/frontend-utils';

/**
 * Indicate that REST API call has failed.
 *
 * @param {string} message
 * @param {{cause: Response}} options
 */
export class RestApiRequestError extends ExtendableError {}

/**
 * Indicate that REST API call responded with error.
 *
 * @param {string} message
 * @param {{cause: Response}} options
 */
export class RestApiResponseError extends ExtendableError {}

/**
 * General purpose function to perform REST API queries.
 *
 * @param {string} url Must start with "/".
 * @param {Object} [params]
 * @param {URLSearchParams} [params.search] URLSearchParams object.
 * @param {HeadersInit} [params.headers] Optional HTTP headers.
 * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} [params.method] HTTP method, GET by default.
 * @param {BodyInit} [params.body]
 * @returns {Promise<Response>}
 */
interface Params {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  search?: URLSearchParams;
  headers?: HeadersInit;
  body?: BodyInit;
}

export default async function rest(url: string, params: Params = {}) {
  try {
    let {search, headers, ...restParams} = params;
    const resource = [url, search?.toString()].filter(Boolean).join('?');

    const response = await fetch(resource, {
      ...restParams,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      }),
    });

    if (!response.ok) {
      throw new RestApiResponseError(response.statusText, {
        cause: response,
      });
    }
    return response;
  } catch (err) {
    if (err instanceof RestApiResponseError) {
      throw err;
    }
    throw new RestApiRequestError('REST API request has failed.', {cause: err});
  }
}
