import {ExtendableError} from '@boonya.dev/frontend-utils';

/**
 * Indicate that REST API call has failed.
 *
 * @param {string} message
 * @param {object} options
 * @param {Response} options.cause
 */
export class RestApiRequestError extends ExtendableError {}

/**
 * Indicate that REST API call responded with error.
 *
 * @param {string} message
 * @param {object} options
 * @param {Response} options.cause
 */
export class RestApiResponseError extends ExtendableError {}

export interface RestApiFetchParams {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | (string & {});
  search?: URLSearchParams;
  headers?: HeadersInit;
  body?: BodyInit;
}

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
export default async function restApiFetch(url: string, params: RestApiFetchParams = {}) {
  try {
    const {search, ...init} = params;
    const resource = [url, search?.toString()].filter(Boolean).join('?');

    const response = await fetch(resource, init);

    if (!response.ok) {
      throw new RestApiResponseError(response.statusText, {cause: response});
    }
    return response;
  } catch (error) {
    if (error instanceof RestApiResponseError) {
      throw error;
    }
    throw new RestApiRequestError('REST API request has failed.', {cause: error});
  }
}
