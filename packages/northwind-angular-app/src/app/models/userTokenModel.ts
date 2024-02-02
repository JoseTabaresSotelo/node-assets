import AccessTokenModel from './accessTokenModel';
import User from './user';

export default interface UserTokenModel {
  user: User;
  userRoles: string[];
  accessToken: AccessTokenModel;
}
