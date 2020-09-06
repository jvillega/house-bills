create user if not exists ''@'%' identified by '';
grant all privileges on bills.* to ''@'%' identified by '';
flush privileges;
