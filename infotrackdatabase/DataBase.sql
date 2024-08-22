USE master; 
GO 

IF NOT EXISTS ( SELECT name FROM sys.databases WHERE name = N'InfoTrack' ) CREATE DATABASE [InfoTrack]; 
Go

CREATE TABLE InfoTrack.dbo.sysHistory (
    id uniqueidentifier PRIMARY KEY ,
    keyword nvarchar(255),
    url varchar(255),
    searchEngine varchar(255),
    positions varchar(255),
    display int,
    createdDate datetime
);

INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Google', '16',1,'2024-08-11 ');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Google', '22',1,'2024-08-12');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Google', '18',1,'2024-08-13');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Google', '30',1,'2024-08-14');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Google', '26',1,'2024-08-15');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Google', '14,30',1,'2024-08-16');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Google', '12',1,'2024-08-17');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Google', '21',1,'2024-08-18');

INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Bing', '10',1,'2024-08-11 ');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Bing', '8',1,'2024-08-12');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Bing', '12',1,'2024-08-13');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Bing', '14',1,'2024-08-14');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Bing', '15',1,'2024-08-15');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Bing', '8,26',1,'2024-08-16');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Bing', '17',1,'2024-08-17');
INSERT INTO InfoTrack.dbo.sysHistory VALUES(NEWID(), 'land registry searches', 'infotrack.co.uk', 'Bing', '21',1,'2024-08-18');

