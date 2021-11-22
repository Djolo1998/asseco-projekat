import { environment } from 'src/environments/environment';

export let tableHeaders = [
  { name: 'Transaction id', fieldKey: 'id', showInMini: true },
  {
    name: 'Beneficiary name',
    fieldKey: 'beneficiary-name',
    showInMini: true,
  },
  {
    name: 'Transaction date',
    fieldKey: 'date',
    showInMini: true,
    sortKey: 'date',
  },
  { name: 'Transaction amount', fieldKey: 'amount', showInMini: true },
  {
    name: 'Transaction kind',
    fieldKey: 'kind',
    showInMini: false,
    filterKey: 'kind',
  },
  {
    name: 'Category',
    fieldKey: 'catcode',
    showInMini: false,
    sortKey: 'catcode',
  },
  {
    name: 'Direction',
    fieldKey: 'direction',
    showInMini: false,
  },
  { name: 'Actions', showInMini: false, fieldKey: '' },
];

const kinds = [
  'dep',
  'wdw',
  'pmt',
  'fee',
  'inc',
  'rev',
  'adj',
  'lnd',
  'lnr',
  'fcx',
  'aop',
  'acl',
  'spl',
  'sal',
];

const transactionKindsParameter =
  environment.type == 'nodeApi' ? 'transaction-kind' : 'transaction-kinds';

export { kinds, transactionKindsParameter };
