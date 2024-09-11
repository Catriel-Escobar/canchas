export interface auth {
  userEntity: UserEntity;
  token: string;
}

export interface UserEntity {
  id: number;
  email: string;
  name: string;
  password: string;
  roles: string[];
  authorities: string[];
  username: string;
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export interface Authority {
  authority: string;
}
