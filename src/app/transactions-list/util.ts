export const mapTransactions = (x: any) => {
  console.log('mapping transactions.....');
  let checkAmount = x['amount'].split(' ').length != 2;
  if (typeof x['amount'] != 'string' || checkAmount) {
    //samo za test za collab
    x['amount'] = x['currency'] + ' ' + x['amount'];
  }
  if (!x['catcode']) {
    x['catcode'] = null;
  }
  if (!x['splits']) {
    x['splits'] = [];
  }
  if (x['splits'].length > 0) {
    x['splits'] = x['splits'].map((s: any) => {
      s['amount'] = '€ ' + s['amount'];
      return s;
    });
  }
  return x;
};

export const getSortDetailsFromArray = (array: [any]) => {
  let sortBy = '';
  let sortOrder = '';
  const sortOrderMap: any = { '1': 'asc', '-1': 'desc' };
  let x: any = array[0];
  sortBy = x.field;
  sortOrder = sortOrderMap[x.order];
  // array.forEach((x: any, ind: number) => {
  //   let separator = ind == 0 ? '' : ',';
  //   sortBy += separator + x.field;
  //   sortOrder += separator + x.field + ',' + sortOrderMap[x.order];
  // });
  return { sortBy, sortOrder };
};

export const sortData = (multiSortMeta: any) => (a: any, b: any) => {
  // console.log('try sorth with ', multiSortMeta);
  if (multiSortMeta.length != 2) return 0;
  // console.log('sortiramo.....');
  let dateA = new Date(a.date).getTime();
  let dateB = new Date(b.date).getTime();

  let catcodeA = a.catcode ?? '';
  let catcodeB = b.catcode ?? '';
  //sort options
  let sortCatcodeAsc = catcodeA.localeCompare(catcodeB);
  let sortCatcodeDesc = catcodeB.localeCompare(catcodeA);
  let sortDateAsc = dateA - dateB;
  let sortDateDesc = dateB - dateA;
  //sortMap
  let sortMap: any = {
    '1 catcode': sortCatcodeAsc,
    '-1 catcode': sortCatcodeDesc,
    '1 date': sortDateAsc,
    '-1 date': sortDateDesc,
  };

  let value1 = sortMap[`${multiSortMeta[0].order} ${multiSortMeta[0].field}`];
  let value2 = sortMap[`${multiSortMeta[1].order} ${multiSortMeta[1].field}`];

  return value1 || value2;
};
