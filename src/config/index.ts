const __DEV__ = false;

const devApiPath = '/api/';
const proApiPath = 'http://153.122.50.6/index.php/api/';

export const apiPath = __DEV__ ? devApiPath : proApiPath;
