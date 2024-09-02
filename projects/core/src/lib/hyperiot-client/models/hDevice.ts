/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HPacket } from './hPacket';
import { HProject } from './hProject';
import { HyperIoTRole } from './hyperIoTRole';


export interface HDevice {
    id?: number;
    entityVersion: number;
    readonly entityCreateDate?: Date;
    readonly entityModifyDate?: Date;
    deviceName?: string;
    password?: string;
    passwordConfirm?: string;
    brand?: string;
    model?: string;
    firmwareVersion?: string;
    softwareVersion?: string;
    description?: string;
    project?: HProject;
    packets?: Array<HPacket>;
    admin?: boolean;
    loginWithSSLCert?: boolean;
    pubKey?: Array<string>;
    x509Cert?: string;
    x509CertKey?: string;
    roles?: Array<HyperIoTRole>;
}
