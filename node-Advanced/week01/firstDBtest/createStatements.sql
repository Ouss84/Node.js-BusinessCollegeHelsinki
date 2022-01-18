drop database if exists employeedb;
create database employeedb;
use employeedb;

create table employee(
    employeeId integer not null primary key,
    firstname varchar(20) not null,
    lastname varchar(30) not null,
    department varchar(15),
    salary decimal(6,2)
);

insert into employee values(1,'Matt','River','ict',5000);
insert into employee values(2,'Maria','Smith','finance',6000);

drop user if exists 'zeke'@'localhost';
create user 'zeke'@'localhost' identified by 'secret';
grant all privileges on employeedb.* to 'zeke'@'localhost';