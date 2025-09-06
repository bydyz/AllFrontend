let $FirstName = location.hostname
/* 

https://test-mp.cwasp.com/?#/Education/Course/List/Edit?id=1586

Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'test-mp.cwasp.com',
  port: null,
  hostname: 'test-mp.cwasp.com',
  hash: '#/Education/Course/List/Edit?id=1586',
  search: '?',
  query: [Object: null prototype] {},
  pathname: '/',
  path: '/?',
  href: 'https://test-mp.cwasp.com/?#/Education/Course/List/Edit?id=1586'
}

*/


export const GetFirstName = () => $FirstName

export const SetFirstName = (name) => $FirstName = name