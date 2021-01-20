import { makeEntity } from 'react-entities';
import * as official from './official';
import * as personView from './personView';
import * as residentSearch from './residentSearch';
import * as deleteDialog from './deleteDialog';
import * as residentViewState from './residentViewState';
import * as personEntity from './personEntity';
import * as residentChangeRoleViewState from './residentChangeRoleViewState';
import * as officialViewState from './officialViewState';

export const usePersonView = makeEntity(personView);
export const useOfficial = makeEntity(official);
export const useResidentSearch = makeEntity(residentSearch);
export const useDeleteDialog = makeEntity(deleteDialog);
export const useResidentViewState = makeEntity(residentViewState);
export const usePersonEntity = makeEntity(personEntity);
export const useResidentChangeRoleViewState = makeEntity(
  residentChangeRoleViewState
);

export const useOfficialViewState = makeEntity(officialViewState);
