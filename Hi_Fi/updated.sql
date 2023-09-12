-- Drop existing tables if they exist
DROP DATABASE IF EXISTS nomadnodes;
CREATE DATABASE nomadnodes;

-- Create Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password_hash VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    freemium_points INT,
    admin_points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
ALTER TABLE users AUTO_INCREMENT=10000;

-- Create WiFi_Routers table
CREATE TABLE wifi_routers (
    router_id INT AUTO_INCREMENT PRIMARY KEY,
    router_name VARCHAR(100),
    mac_address VARCHAR(100),
    elastic_ip VARCHAR(100),
    ip_address VARCHAR(100),
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    security_type VARCHAR(20),
    signal_strength INT,
    last_seen TIMESTAMP
);
ALTER TABLE wifi_routers AUTO_INCREMENT=20000;

-- Create Features table
CREATE TABLE features (
    feature_id INT AUTO_INCREMENT PRIMARY KEY,
    feature_name VARCHAR(100),
    feature_point INT
);

-- Create Owners table
CREATE TABLE owners (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    router_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (router_id) REFERENCES wifi_routers(router_id)
);

-- Insert mock data into Users table
INSERT INTO users (username, password_hash, email, freemium_points, admin_points, created_at, last_login)
VALUES
    ('user1', 'hash1', 'user1@example.com', 100, 50, '2023-08-21 12:00:00', '2023-08-21 15:30:00'),
    ('user2', 'hash2', 'user2@example.com', 200, 30, '2023-08-21 13:00:00', '2023-08-21 16:45:00'),
    ('user3', 'hash3', 'user3@example.com', 50, 10, '2023-08-21 14:00:00', '2023-08-21 17:20:00'),
    ('user4', 'hash4', 'user4@example.com', 300, 80, '2023-08-21 15:00:00', '2023-08-21 18:00:00'),
    ('user5', 'hash5', 'user5@example.com', 150, 20, '2023-08-21 16:00:00', '2023-08-21 19:30:00');



-- Insert mock data into Features table
INSERT INTO features (feature_name, feature_point)
VALUES
    ('Active', 1),
    ('Ad Blocking', 2),
    ('Parental Controls', 4),
    ('VPN', 8),
    ('Captive Portals', 16);

-- Insert mock data into Owners table
INSERT INTO owners (user_id, router_id)
VALUES
    (10000, 20000),
    (10003, 20001);
    
-- Add the "location_type" and "wifi_online_type" columns to the WiFi_Routers table
ALTER TABLE wifi_routers
ADD COLUMN location_type VARCHAR(50),
ADD COLUMN wifi_online_type VARCHAR(50);


-- Insert mock data into WiFi_Routers table
INSERT INTO wifi_routers (router_name, mac_address, elastic_ip, ip_address, latitude, longitude, security_type, signal_strength, last_seen，location_type, wifi_online_type)
VALUES
    ('Router A', '00:11:22:33:44:55', '192.168.1.100', '192.168.1.1', -43.64532061931982, 172.4642259485763, 'WPA2', 90, '2023-08-21 14:00:00', 'cafe', '7/24'),
    ('Router B', 'AA:BB:CC:DD:EE:FF', '192.168.1.101', '192.168.1.2', -43.64231213421989, 172.47189882630357, 'WPA', 80, '2023-08-21 15:30:00', 'shops', 'trading time'),
    ('Router C', '11:22:33:44:55:66', '192.168.1.102', '192.168.1.3', -43.64395447295253, 172.472956226081, 'WEP', 70, '2023-08-21 16:45:00', 'office', 'trading time'),
    ('Router D', 'A1:B2:C3:D4:E5:F6', '192.168.1.103', '192.168.1.4', -43.647430468722135, 172.46338221035705, 'WPA2', 85, '2023-08-21 17:30:00', 'park', '24/7');

