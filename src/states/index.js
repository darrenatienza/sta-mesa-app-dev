import { makeEntity } from 'react-entities';
import * as official from './official';
import * as resident from './resident';
import * as residentSearch from './residentSearch';
import * as deleteDialog from './deleteDialog';

export const useResident = makeEntity(resident);
export const useOfficial = makeEntity(official);
export const useResidentSearch = makeEntity(residentSearch);
export const useDeleteDialog = makeEntity(deleteDialog);
