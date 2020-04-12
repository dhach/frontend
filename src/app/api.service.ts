import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ResourceContactMessage } from './_types/ResourceContactMessage';
import { ApiResponse } from './_types/ApiResponse';


const host = environment.apiHost;


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
  }


  async verifyAdminKey(data): Promise<ApiResponse> {
    return this._postTo('/admin/verify-key', data);
  }


  async requestCall(data, recaptcha) {
    return this._postTo('/telephone-callback', data, {recaptcha});
  }


  // Send offer to server and get the token/key to reaccess the offer
  async sendOffer(data, recaptcha) {
    return this._postTo('/resources', data, {recaptcha});
  }


  // Request to review offer from server via a token and return response data
  async reviewOffer(token) {
    return this._getTo(`/resources/offers/${token}`);
  }


  async deleteOffer(token) {
    throw new Error('Not implemented');
  }


  async getOffers(type: string, data: object) {
    const suffix = `/resources/${type}`;
    return this._getTo(suffix, {queryParams: data});
  }


  async sendResourceContactMessage(
    resourceType: string, resourceId: number, message: ResourceContactMessage, recaptcha: string
  ): Promise<ApiResponse> {
    let resourceUrl;
    switch (resourceType) {
      case 'personnel':
        resourceUrl = 'manpower';
        break;
      case 'device':
        resourceUrl = 'devices';
        break;
      case 'consumable':
        resourceUrl = 'consumables';
        break;
    }
    const endpointPath = `/resources/${resourceUrl}/${resourceId}/contact`;
    return this._postTo(endpointPath, message, {recaptcha});
  }


  async subscribeRegion(data: object, recaptcha: string): Promise<ApiResponse> {
    return this._postTo('/subscription', data, {recaptcha});
  }


  async editProvider(token: string, data: any): Promise<ApiResponse> {
    return this._putTo(`/resources/offers/${token}/provider`, data);
  }


  async editPersonnel(token: string, resourceId: number, data: any): Promise<ApiResponse> {
    return this._putTo(`/resources/offers/${token}/personal/${resourceId}`, data);
  }


  async editDevice(token: string, resourceId: number, data: any): Promise<ApiResponse> {
    return this._putTo(`/resources/offers/${token}/device/${resourceId}`, data);
  }


  async editConsumable(token: string, resourceId: number, data: any): Promise<ApiResponse> {
    return this._putTo(`/resources/offers/${token}/consumable/${resourceId}`, data);
  }


  async editDeviceAmount(token: string, resourceId: number, amount: number, reason?: string) {
    return this._putTo(`/resources/offers/${token}/device/${resourceId}/amount`, {amount, reason});
  }


  async editConsumableAmount(token: string, resourceId: number, amount: number, reason?: string) {
    return this._putTo(`/resources/offers/${token}/consumable/${resourceId}/amount`, {amount, reason});
  }


  async deletePersonnel(token: string, resourceId: number, reason: string) {
    return this._deleteTo(`/resources/offers/${token}/personal/${resourceId}`, reason);
  }


  async deleteDevice(token: string, resourceId: number, reason: string) {
    return this._deleteTo(`/resources/offers/${token}/device/${resourceId}`, reason);
  }


  async deleteConsumable(token: string, resourceId: number, reason: string) {
    return this._deleteTo(`/resources/offers/${token}/consumable/${resourceId}`, reason);
  }


  private async _getTo(
    endpointPath: string,
    opts: {
      queryParams?: object,
      recaptcha?: string
    } = {}
  ): Promise<ApiResponse> {
    const {queryParams, recaptcha} = opts;

    // Generate query params string
    let queryParamsString = '';
    if (queryParams) {
      const searchParams = new URLSearchParams();
      for (const key in queryParams) {
        if (!queryParams.hasOwnProperty(key)) {
          continue;
        }
        const value = queryParams[key];
        if (Array.isArray(value)) {
          for (const v of value) {
            searchParams.append(key, v);
          }
        } else {
          searchParams.append(key, value);
        }
      }
      queryParamsString = searchParams.toString();
    }

    const urlSuffix = endpointPath + '?' + queryParamsString;
    const headers = new Headers();
    if (recaptcha) {
      headers.append('recaptcha', recaptcha);
    }
    return this._fetch(urlSuffix, 'GET', headers);
  }


  private async _postTo(
    endpointPath: string,
    body?: any,
    opts: {
      recaptcha?: string
    } = {}
  ): Promise<ApiResponse> {
    const {recaptcha} = opts;

    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    if (recaptcha) {
      headers.append('recaptcha', recaptcha);
    }
    return this._fetch(endpointPath, 'POST', headers, body);
  }


  private async _putTo(
    endpointPath: string,
    body?: any,
    opts: {
      recaptcha?: string
    } = {}
  ): Promise<ApiResponse> {
    const {recaptcha} = opts;

    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    if (recaptcha) {
      headers.append('recaptcha', recaptcha);
    }
    return this._fetch(endpointPath, 'PUT', headers, body);
  }


  private async _deleteTo(
    endpointPath: string,
    body?: any,
    opts: {
      recaptcha?: string
    } = {}
  ): Promise<ApiResponse> {
    const {recaptcha} = opts;

    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    if (recaptcha) {
      headers.append('recaptcha', recaptcha);
    }
    return this._fetch(endpointPath, 'DELETE', headers, body);
  }


  private async _fetch(urlSuffix: string, method: string, headers?: Headers, body?: any): Promise<ApiResponse> {
    const bodyString = body ? JSON.stringify(body) : undefined;
    const request = new Request(host + urlSuffix, {
      method,
      headers,
      body: bodyString,
    });

    const response = await fetch(request);
    const contentType = response.headers.get('content-type');
    let responseData;
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }
    if (response.status >= 200 && response.status < 300) {
      return {
        status: response.status,
        data: responseData,
      };
    } else {
      return {
        status: response.status,
        error: {
          message: responseData,
        },
      };
    }
  }
}
