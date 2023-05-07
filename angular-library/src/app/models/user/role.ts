import { InjectionToken } from '@angular/core';
import { find } from 'lodash';
import { ProductHierarchyTypeEnum } from '../enums';
import { isEmptyArray } from 'src/app/utilities/array';


export type RoleString = string;
export interface RoleObject { hierarchyType: ProductHierarchyTypeEnum, roles: string[] }
export type Role = RoleObject | string;
export type Roles = Role[];
export type RoleAssignment = { savePermittedRoles: Roles };
export const ROLE_ASSIGNMENT = new InjectionToken<RoleAssignment>('RoleAssignment');

export function checkRoleForHierarchyType(requiredRoles: Roles, hierarchyType: ProductHierarchyTypeEnum | string, matchedAction: (hierarchicalRequiredRoles: string[]) => boolean): boolean {
    if (isEmptyArray(requiredRoles)) {
        return false;
    }
    
    let roles: string[];
    if (typeof requiredRoles[0] === 'object') {
        if (hierarchyType === null || hierarchyType === undefined || hierarchyType === '') { return false; }
        let rolesForHierarchy = find(requiredRoles, {
            hierarchyType: hierarchyType,
        }) as RoleObject;
        roles = rolesForHierarchy ? (rolesForHierarchy.roles || []) : [];
    } else {
        roles = (requiredRoles || []) as string[];
    }

    return matchedAction(roles);
}