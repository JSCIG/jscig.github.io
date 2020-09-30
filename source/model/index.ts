import { History } from 'cell-router/source';

import { ProposalModel } from './Proposal';
import { MemberModel } from './Member';

export * from './Proposal';
export * from './Member';

export const history = new History();
export const proposal = new ProposalModel();
export const member = new MemberModel();
