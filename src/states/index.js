import { makeEntity } from 'react-entities';
import * as official from './official';
import * as personView from './personView';
import * as residentSearch from './residentSearch';
import * as deleteDialog from './deleteDialog';
import * as residentViewState from './residentViewState';

export const usePersonView = makeEntity(personView);
export const useOfficial = makeEntity(official);
export const useResidentSearch = makeEntity(residentSearch);
export const useDeleteDialog = makeEntity(deleteDialog);
export const useResidentViewState = makeEntity(residentViewState);