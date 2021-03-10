import { makeEntity } from 'react-entities';
import * as official from './official';
import * as personView from './personView';
import * as residentSearch from './residentSearch';
import * as deleteDialog from './deleteDialog';
import * as residentViewState from './residentViewState';
import * as personEntity from './personEntity';
import * as residentChangeRoleViewState from './residentChangeRoleViewState';
import * as officialViewState from './officialViewState';
import * as healthWorkerViewState from './healthWorkerViewState';
import * as barangayClearanceViewState from './barangayClearanceViewState';
import * as currentUser from './currentUser';
import * as businessClearanceViewState from './businessClearanceViewState';
import * as relationship from './relationship';
import * as residency from './residency';
import * as indigencyViewState from './indigencyViewState';

export const useResidency = makeEntity(residency);
export const useRelationship = makeEntity(relationship);
export const usePersonView = makeEntity(personView);
export const useOfficial = makeEntity(official);
export const useResidentSearch = makeEntity(residentSearch);
export const useDeleteDialog = makeEntity(deleteDialog);
export const useResidentViewState = makeEntity(residentViewState);
export const usePersonEntity = makeEntity(personEntity);
export const useResidentChangeRoleViewState = makeEntity(
  residentChangeRoleViewState
);
export const useHealthWorkerViewState = makeEntity(healthWorkerViewState);
export const useOfficialViewState = makeEntity(officialViewState);
export const useBarangayClearanceViewState = makeEntity(
  barangayClearanceViewState
);
export const useCurrentUser = makeEntity(currentUser);

export const useBusinessClearanceViewState = makeEntity(
  businessClearanceViewState
);
export const useIndigencyViewState = makeEntity(indigencyViewState);
