/**
 * HyperIoT Rule
 * HyperIoT Rule API
 *
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { HttpContext }                                       from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Rule } from '../../../models/rule';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../../../models/configuration';


@Injectable()
export class RulesService {

    protected basePath = '/hyperiot/rules';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * /module/status
     * Simple service for checking module status
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public checkModuleWorking(observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public checkModuleWorking(observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public checkModuleWorking(observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public checkModuleWorking(observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/module/status`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules/{id}
     * Service for deleting a rule entity
     * @param id The rule id which must be deleted
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteRule(id: number, observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public deleteRule(id: number, observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public deleteRule(id: number, observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public deleteRule(id: number, observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteRule.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules/operations
     * Service for finding all rule operations
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllAvailableOperations(observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public findAllAvailableOperations(observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public findAllAvailableOperations(observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public findAllAvailableOperations(observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/operations`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules/all
     * Service for finding all rule entities
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllRule(observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public findAllRule(observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public findAllRule(observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public findAllRule(observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/all`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules/actions
     * Service for finding all rule actions
     * @param type 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllRuleActions(type?: string, observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public findAllRuleActions(type?: string, observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public findAllRuleActions(type?: string, observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public findAllRuleActions(type?: string, observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (type !== undefined && type !== null) {
            queryParameters = queryParameters.set('type', <any>type);
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/actions`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules/bypacket/{packetId}
     * Service for finding all rule entities for a given packet
     * @param packetId The packet id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllRuleByPacketId(packetId: number, observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public findAllRuleByPacketId(packetId: number, observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public findAllRuleByPacketId(packetId: number, observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public findAllRuleByPacketId(packetId: number, observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        if (packetId === null || packetId === undefined) {
            throw new Error('Required parameter packetId was null or undefined when calling findAllRuleByPacketId.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/bypacket/${encodeURIComponent(String(packetId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules/byproject/{projectId}
     * Service for finding all rule entities for a given project
     * @param projectId The project id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllRuleByProjectId(projectId: number, observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public findAllRuleByProjectId(projectId: number, observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public findAllRuleByProjectId(projectId: number, observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public findAllRuleByProjectId(projectId: number, observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling findAllRuleByProjectId.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/byproject/${encodeURIComponent(String(projectId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules
     * Service for finding all rule entities
     * @param delta 
     * @param page 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllRulePaginated(delta?: number, page?: number, observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public findAllRulePaginated(delta?: number, page?: number, observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public findAllRulePaginated(delta?: number, page?: number, observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public findAllRulePaginated(delta?: number, page?: number, observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (delta !== undefined && delta !== null) {
            queryParameters = queryParameters.set('delta', <any>delta);
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules/{id}
     * Service for finding rules
     * @param id id from which rule object will retrieve
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findRule(id: number, observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public findRule(id: number, observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public findRule(id: number, observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public findRule(id: number, observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling findRule.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules
     * Service for adding a new rule entity
     * @param body Rule entity which must be saved 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveRule(body: Rule, observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public saveRule(body: Rule, observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public saveRule(body: Rule, observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public saveRule(body: Rule, observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveRule.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/rules
     * Service for updating a rule entity
     * @param body Rule entity which must be updated 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateRule(body: Rule, observe?: 'body', reportProgress?: boolean, context?: HttpContext): Observable<any>;
    public updateRule(body: Rule, observe?: 'response', reportProgress?: boolean, context?: HttpContext): Observable<HttpResponse<any>>;
    public updateRule(body: Rule, observe?: 'events', reportProgress?: boolean, context?: HttpContext): Observable<HttpEvent<any>>;
    public updateRule(body: Rule, observe: any = 'body', reportProgress: boolean = false, context = new HttpContext()): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateRule.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                context: context,
                reportProgress: reportProgress
            }
        );
    }

}
