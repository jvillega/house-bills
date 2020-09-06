create user if not exists 'bills_admin'@'%' identified by '4utiliti3s tneR appLe d0Ta';
grant all privileges on bills.* to 'bills_admin'@'%' identified by '4utiliti3s tneR appLe d0Ta';
flush privileges;
